from flask import Flask,render_template,request,send_from_directory
from flask_cors import CORS
from librosa import load
import os
from werkzeug.utils import secure_filename
from logic import logic
import numpy as np
import soundfile
from IPython.display import Audio
import matplotlib.pyplot as plt
from matplotlib.pyplot import savefig
app = Flask(__name__)
CORS(app)
UPLOADS_FOLDER = './static'
app.config['UPLOADS_FOLDER'] = UPLOADS_FOLDER
# signal = []
# re_con = []
@app.route("/")
def default():
    pass
@app.route("/upload",methods=['GET','POST'])
def upload():
    if (request.method == 'POST'):
        if "file" not in request.files:
            return {"there is an error":'err'},400
        file = request.files["file"]
        signal,sr = load(file)
        completeName= os.path.join(app.config['UPLOADS_FOLDER'],'signal.mp3')
        soundfile.write(completeName,signal,sr)
        return("good")
@app.route('/static/<path:filename>')
def send_attachment(filename):
  return send_from_directory(app.config['UPLOADS_FOLDER'], 
    filename=filename)
@app.route('/sliders',methods=['GET','POST'])
def get_sliders_values():
    if (request.method == 'POST'):
        if "array" not in request.form:
            return {"there is an error":'err'},400
        array = request.form["array"]
        signal,sr = load('./static/signal.mp3')
        my_list = array.split(",")
        slider_list = [float(i) for i in my_list]
        fig ,(ax1,ax2) = plt.subplots(2,1)
        fig.set_figheight(10)
        fig.set_figwidth(10)
        fig.tight_layout()
        ax1.specgram(signal,NFFT=5000, Fs = sr, cmap="jet")
        ax1.set_title('Spectrogram - Before')
        ax1.set_xlabel("Time")
        ax1.set_ylabel("Freq")
        mode = slider_list[-1]
        mode = int(mode)
        slider_list = slider_list[:len(slider_list)-1]
        f_signal,freqs = logic.fourier(signal,sr)
        re_fou = logic.final_func(f_signal,freqs,sr,slider_list,mode)
        re_con = np.fft.irfft(re_fou)
        ax2.specgram(re_con,NFFT=5000, Fs = sr, cmap="jet")
        ax2.set_title('Spectrogram - After')
        ax2.set_xlabel("Time")
        ax2.set_ylabel("Freq")
        plt.tight_layout()
        completeName_image= os.path.join(app.config['UPLOADS_FOLDER'],'original.png')
        plt.savefig( completeName_image,format='png')
        completeName = os.path.join(app.config['UPLOADS_FOLDER'],'modified.mp3')
        soundfile.write(completeName,re_con,sr)
        return "good"
if __name__ == "__main__":
    app.run(debug=True,port='8080',host='0.0.0.0')
    