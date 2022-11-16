import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat
import librosa
class logic():
    list_of_music = [[2,1000],[1000,2500],[2500,9000]]
    list_of_vowels = [[330,3300],[370,2650],[4000,5000],[0,100]]
    list_of_modes = [list_of_music,list_of_vowels]
    def  first_mode_ranges(sample_rate):
        fMax = sample_rate//2
        list_of_range = np.arange(0,fMax,fMax/11)
        list_of_lists =[]
        for i in range(len(list_of_range)-1):
            small_list=[list_of_range[i],list_of_range[i+1]]
            list_of_lists.append(small_list)
        return list_of_lists
    def final_func(fou_of_signal,frequencies,samplingfreq,list_of_sliders,mode):
        final_fou = fou_of_signal
        if mode == 0:
            list_of_freqs = logic.first_mode_ranges(samplingfreq)
        else:
            list_of_freqs = logic.list_of_modes[mode-1]
        for iter in range(len(list_of_sliders)):
            freqs_update = logic.select_range(frequencies,list_of_freqs[iter][0],list_of_freqs[iter][1],True)
            final_fou = logic.modify_magnitude(freqs_update,fou_of_signal,list_of_sliders[iter])
        return final_fou
    def read_ecg_file(file_path):
        signal = loadmat(file_path)
        signal = signal['val'][0]
        return signal
    def modify_magnitude(freq_list,list_freq_domain,factor):
        list_freq_domain[freq_list] = list_freq_domain[freq_list] * factor
        return list_freq_domain
    def fourier(list_time_domain,sampling_rate):
        list_freq_domain = np.fft.rfft(list_time_domain)
        frequncies = np.fft.rfftfreq(len(list_time_domain),1/sampling_rate)
        return list_freq_domain,frequncies
    def select_range(frequncies,min,max,equal):
        if equal:
            selected_freqs = (frequncies>=min)&(frequncies<=max)
        else:
            selected_freqs = (frequncies>min)&(frequncies<max)
        return selected_freqs
    def voice_change(signal,sampling_frequency,shift_factor):
        changed_voice = librosa.effects.pitch_shift(signal, sr=sampling_frequency, n_steps=shift_factor)
        return changed_voice