import face_recognition
import pickle
import cv2
import os
import numpy as np
import urllib
import sys


def recognize_face(img):
    # print("recognization started")
    image = cv2.imread(img)
    # print(image.shape)
    # print(image)
    # print(not hasattr(image, 'shape'))
    if(not hasattr(image, 'shape')):
        url_response = urllib.request.urlopen(img)
        image = np.array(bytearray(url_response.read()))
        image = cv2.imdecode(image, -1)

    # store image in cloudinary
    #find path of xml file containing haarcascade file
    cascPathface = os.path.dirname(
    cv2.__file__) + "/data/haarcascade_frontalface_alt2.xml"
    # load the harcaascade in the cascade classifier
    faceCascade = cv2.CascadeClassifier(cascPathface)
    # load the known faces and embeddings saved in last file
    data = pickle.loads(open('face_enc', "rb").read())
    #Find path to the image you want to detect face and pass it here
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    #convert image to Greyscale for haarcascade
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(gray,
                                        scaleFactor=1.1,
                                        minNeighbors=5,
                                        minSize=(60, 60),
                                        flags=cv2.CASCADE_SCALE_IMAGE)
    
    # the facial embeddings for face in input
    encodings = face_recognition.face_encodings(rgb)
    names = []
    # loop over the facial embeddings incase
    # we have multiple embeddings for multiple fcaes
    for encoding in encodings:
        #Compare encodings with encodings in data["encodings"]
        #Matches contain array with boolean values and True for the embeddings it matches closely
        #and False for rest
        matches = face_recognition.compare_faces(data["encodings"],
        encoding)
        #set name =inknown if no encoding matches
        name = "Unknown"
        # check to see if we have found a match
        if True in matches:
            #Find positions at which we get True and store them
            matchedIdxs = [i for (i, b) in enumerate(matches) if b]
            counts = {}
            # loop over the matched indexes and maintain a count for
            # each recognized face face
            for i in matchedIdxs:
                #Check the names at respective indexes we stored in matchedIdxs
                name = data["names"][i]
                #increase count for the name we got
                counts[name] = counts.get(name, 0) + 1
                #set name which has highest count
                name = max(counts, key=counts.get)
    
    
            # update the list of names
            names.append(name)
            # loop over the recognized faces
            for ((x, y, w, h), name) in zip(faces, names):
                # rescale the face coordinates
                # draw the predicted face name on the image
                cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(image, name, (x, y), cv2.FONT_HERSHEY_SIMPLEX,
                0.75, (0, 255, 0), 2)
        # cv2.imshow("Frame", image)
        # cv2.waitKey(0)


    # print("[INFO] {} face(s) found".format(len(faces)))
    # print("[INFO] The names of the people in the image are: {}".format(names))
    return names

roll = recognize_face(sys.argv[1])
if roll:
    print(roll[0])
else:
    print("0000000")


 