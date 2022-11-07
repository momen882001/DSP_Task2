import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat
class logic():
    def read_ecg_file(file_path):
        signal = loadmat(file_path)
        signal = signal['val'][0]
        return signal
    def modify_magnitude(freq_list,list_freq_domain,factor):
        list_freq_domain[freq_list] = list_freq_domain[freq_list] * factor
        return list_freq_domain
    def fourier(list_time_domain,sampling_rate):
        list_freq_domain = np.fft.rfft(list_time_domain)
        frequncies = np.fft.fftfreq(len(list_freq_domain),sampling_rate)
        return list_freq_domain,frequncies
    def select_range(frequncies,min,max,equal):
        if equal:
            selected_freqs = (frequncies>=min)&(frequncies<=max)
        else:
            selected_freqs = (frequncies>min)&(frequncies<max)
        return selected_freqs
