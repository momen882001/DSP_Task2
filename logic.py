import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat
class logic():
    def final_func(fou_of_signal,frequencies,list_of_freqs,list_of_sliders,sampling_rate=360):
        final_fou = fou_of_signal
        for iter in range(len(list_of_sliders)):
            freqs_update = logic.select_range(frequencies,list_of_freqs[iter][0],list_of_freqs[iter][1],True)
            final_fou[freqs_update] = logic.modify_magnitude(freqs_update,fou_of_signal,list_of_sliders[iter])
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
