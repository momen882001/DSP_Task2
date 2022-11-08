from flask import Flask,render_template,request,send_from_directory
from flask_cors import CORS
from librosa import load
import os
from werkzeug.utils import secure_filename
app = Flask(__name__)
CORS(app)
@app.route("/")
def default():
    pass
@app.route("/upload",methods=['GET','POST'])
def upload():
    if (request.method == 'POST'):
        if "file" not in request.files:
            return {"there is an error":'err'},400
        file = request.files["file"]
        completeName = os.path.join('/static',file.filename)
        file.save(completeName)
        return("hello")
    else:
        return send_from_directory(app.config['static'],filename=file.filename)
if __name__ == "__main__":
    app.run(debug=True,port='8080',host='0.0.0.0')
    