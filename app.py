from flask import Flask,render_template,request,jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
# app = Flask(__name__)
# @app.route("/")
# def default():
#     return render_template("index.html")
# @app.route("/upload",methods=['GET','POST'])
# def upload():
#     if (request.method == 'POST'):
#         print("File Readed")
#         return "ahmed"
#     else:
#         print("ana get ya ahbl")
# if __name__ == "__main__":
#     app.run(debug=True)
app = Flask(__name__)
api = Api(app)
CORS(app)
class Helloworld(Resource):
    some_json = 0
    def get(self):
        print (Helloworld.some_json)
        return jsonify({'about':'Helloworld'})
    def post(self):
        self.some_json = request.get_json()
        # print (Helloworld.some_json)
        print(request.files)
        if "file" not in request.files:
            return {"there is an error":'err'},400
        file = request.files["file"]
        print(file)
        return jsonify({'yousent':self.some_json})
api.add_resource(Helloworld,'/upload')
if __name__ == "__main__":
    app.run(debug=True,port='8080',host='0.0.0.0')
    