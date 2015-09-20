import numpy
import heapq
from math import radians, cos, sin, asin, sqrt
from models import WebUser
from numpy import matrix


cats = {'mexican': 54, 'chinese': 22, 'german': 35, 'moroccan': 58, 'cambodian': 18, 'singaporean': 70, 'turkish': 82, 'soulfood': 71, 'argentine': 4, 'indonesian': 44, 'hungarian': 42, 'vegan': 84, 'hotdogs': 28, 'malaysian': 52, 'steak': 75, 'italian': 46, 'portuguese': 64, 'basque': 7, 'mediterranean': 53, 'japanese': 47, 'persian': 60, 'polish': 63, 'newamerican': 2, 'chicken_wings': 21, 'fishnchips': 30, 'modern_european': 56, 'caribbean': 19, 'fondue': 31, 'asianfusion': 5, 'afghani': 0, 'cajun': 17, 'latin': 50, 'french': 33, 'gluten_free': 36, 'diners': 26, 'gastropubs': 34, 'filipino': 29, 'vegetarian': 85, 'cafes': 16, 'british': 12, 'kosher': 49, 'tapasmallplates': 79, 'mideastern': 55, 'himalayan': 40, 'ethiopian': 27, 'spanish': 74, 'buffets': 13, 'brazilian': 10, 'creperies': 23, 'tex-mex': 80, 'bbq': 6, 'belgian': 8, 'tradamerican': 3, 'hawaiian': 39, 'taiwanese': 77, 'cheesesteaks': 20, 'raw_food': 51, 'russian': 65, 'vietnamese': 86, 'thai': 81, 'pakistani': 59, 'salad': 66, 'breakfast_brunch': 11, 'indpak': 43, 'scandinavian': 68, 'soup': 72, 'seafood': 69, 'halal': 38, 'irish': 45, 'peruvian': 61, 'sushi': 76, 'delis': 25, 'mongolian': 57, 'foodstands': 32, 'burgers': 14, 'sandwiches': 67, 'korean': 48, 'pizza': 62, 'ukrainian': 83, 'brasseries': 9, 'southern': 73, 'cuban': 24, 'tapas': 78, 'greek': 37, 'burmese': 15, 'african': 1, 'hotdog': 41}

def best_match(restos, lon, lat):
    user = WebUser.objects.get(id=2)
    # filter out closed restos
    restos = [i for i in restos if i["is_closed"] == False]

    dataset = user.get_weights()
    total =""
    for i in range(0, len(dataset)):
        line = ""
        for j in range(0, 90):
            line += str(dataset[i][j]) + " "
        line += ";"
        total += line
    print total
    data_matrix = numpy.matrix(dataset)
    print data_matrix
    # D = numpy.matrix(data_matrix)
    D = data_matrix
    print D
    X = D[:, :89]
    Y = D[:, 89]

    w = gradient(X,Y)

    vectors = []
    for resto in restos:
        vectors.append(compute_vector(resto, lon, lat))

    #temporary top 5 distance, use algo later
    h = []
    for i in range(0, len(restos)):
        restos[i]["distance"] = vectors[i][87]
        score = -1*matrix(vectors[i]).dot(w).sum()
        heapq.heappush(h, (score, restos[i]))

    best = []
    for i in range(0,5):
        tup = heapq.heappop(h)
        print tup[0]
        print tup[1]
        best.append(tup[1])
    return best

def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    km = 6367 * c
    return km

def compute_vector(resto, lon, lat):
    #index 87 = rating
    #index 88 = distance
    vector = [0] * 89
    vector[87] = resto["rating"]
    vector[88] = haversine(float(lon), float(lat), resto["location"]["coordinate"]["longitude"], resto["location"]["coordinate"]["latitude"]) # compute distance
    # create vectors [0....1.....0......1...0]
    for ethnic in resto["categories"]:
        if(ethnic[1] in cats):
            vector[cats[ethnic[1]]] = 1

    return vector

def gradient(X, Y):
    #intialize weights to 1
    w = numpy.matrix.transpose(numpy.matrix([0]*89))
    print w.shape
    print X.shape
    print Y.shape
    # temporary Y
    #y = numpy.matrix.transpose(numpy.matrix([1]*20))
    Xt = numpy.matrix.transpose(X)
    for i in range(1,1000):
        dw =  matrix.dot(matrix.dot(Xt,X), w) - matrix.dot(Xt, Y)
        w = w - 0.0005 * dw
    return w
