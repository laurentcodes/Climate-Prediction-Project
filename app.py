from flask import Flask, render_template, request
import numpy as np
import pandas as pd
from datetime import datetime
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import r2_score
import joblib
from sklearn.preprocessing import RobustScaler
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
import csv
from math import sqrt
from sklearn.svm import SVR
import sklearn.svm as svm
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import PolynomialFeatures
from datetime import timedelta

app = Flask(__name__, static_folder='./frontend/build/static')

months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

column_names_temperature = [
    'Year', 'Month', 'Day', 'Hour', 'Minutes', 'TempMean', 'TempMax', 'TempMin'
]

column_names_humidity = [
    'Year', 'Month', 'Day', 'Hour', 'Minutes', 'HumMean', 'HumMax', 'HumMin'
]
column_names_precipitation = [
    'Year', 'Month', 'Day', 'Hour', 'Minutes', 'PreMean', 'PreMax', 'PreMin'
]

column_names_used = ['MD']


def make_numeric_values(arr, title):
    new_arr = []

    for date in arr[title]:
        new_arr.append(date)
    arr[title] = new_arr


def fix_array(arr):
    for name in column_names_used:
        make_numeric_values(arr, name)


def train():
    dataset_temp = './dailytemphistory_export_2020-03-18T17_20_46.csv'
    dataset_rain = './dailyrainhistory_export_2020-03-18T17_21_25.csv'
    dataset_hum = './dailyhumihistory_export_2020-03-18T17_21_13.csv'

    tree_model = DecisionTreeRegressor()

    data1 = pd.read_csv(dataset_temp, sep=';', skiprows=12,
                        names=column_names_temperature)
    data1['MD'] = data1['Month'].astype(str)+''+data1['Day'].astype(str)
    data1 = data1.drop('TempMin', axis=1)
    X = data1.drop(["TempMax"], axis=1)
    X = X.drop(['Hour'], axis=1)
    X = X.drop(['Minutes'], axis=1)
    X = X.drop(['Year'], axis=1)
    X = X.drop(['Month'], axis=1)
    X = X.drop(['Day'], axis=1)
    X = X.drop(['TempMean'], axis=1)
    fix_array(X)
    y = data1['TempMean']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=123)
    tree_model.fit(X_train, y_train)
    print('Accuracy: ', tree_model.score(X_test, y_test))
    joblib.dump(tree_model, 'temperature.pkl')

    data1 = pd.read_csv(dataset_hum, sep=';', skiprows=12,
                        names=column_names_humidity)
    data1['MD'] = data1['Month'].astype(str)+''+data1['Day'].astype(str)
    data1 = data1.drop('HumMin', axis=1)
    X = data1.drop(["HumMax"], axis=1)
    X = X.drop(['Hour'], axis=1)
    X = X.drop(['Minutes'], axis=1)
    X = X.drop(['Year'], axis=1)
    X = X.drop(['Month'], axis=1)
    X = X.drop(['Day'], axis=1)
    X = X.drop(['HumMean'], axis=1)
    fix_array(X)
    y = data1['HumMean']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=123)
    tree_model.fit(X_train, y_train)
    print('Accuracy: ', tree_model.score(X_test, y_test))
    joblib.dump(tree_model, 'humidity.pkl')

    data1 = pd.read_csv(dataset_rain, sep=';', skiprows=12,
                        names=column_names_precipitation)
    data1['MD'] = data1['Month'].astype(str)+''+data1['Day'].astype(str)
    data1 = data1.drop('PreMin', axis=1)
    X = data1.drop(["PreMax"], axis=1)
    X = X.drop(['Hour'], axis=1)
    X = X.drop(['Minutes'], axis=1)
    X = X.drop(['Year'], axis=1)
    X = X.drop(['Month'], axis=1)
    X = X.drop(['Day'], axis=1)
    X = X.drop(['PreMean'], axis=1)
    fix_array(X)
    y = data1['PreMean']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=123)
    tree_model.fit(X_train, y_train)
    print('Accuracy: ', tree_model.score(X_test, y_test))
    joblib.dump(tree_model, 'rainfall.pkl')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/current', methods=['GET'])
def current():
    if request.method == 'GET':
        print('Hello')
        train()
        tree_model_temperature = joblib.load('temperature.pkl')
        tree_model_humidity = joblib.load('humidity.pkl')
        tree_model_rainfall = joblib.load('rainfall.pkl')

        datetime_object = datetime.now()
        datetime_object = datetime_object.strftime("%Y-%m-%d %H:%M:%S")

        first = datetime_object.split(' ')
        second = first[0].split('-')
        today = second[1]+''+second[2]
        date = [[today]]

        print('date')
        print(date)

        temp = tree_model_temperature.predict(date)[0]
        hum = tree_model_humidity.predict(date)[0]
        rain = tree_model_rainfall.predict(date)[0]

        return {
            'temp': round(temp, 1),
            'hum': round(hum, 1),
            'rain': round(rain, 1)
        }


@app.route('/api/res', methods=['POST'])
def res():
    train()
    tree_model_temperature = joblib.load('temperature.pkl')
    tree_model_humidity = joblib.load('humidity.pkl')
    tree_model_rainfall = joblib.load('rainfall.pkl')

    if request.method == 'POST':
        req = request.json
        print(req['body']['start'])
        # month_start = req['start']
        # year_start = req['startyear']
        # month_end = req['end']
        # year_end = req['endyear']
        month_start = req['body']['start']
        year_start = req['body']['startYear']
        month_end = req['body']['end']
        year_end = req['body']['endYear']
        print(month_start, year_start, month_end, year_end)

        start = 0
        stop = 0
        year = int(year_start)

        for item in range(0, len(months)):
            if month_start == months[item]:
                start = item
            if month_end == months[item]:
                stop = item + 1

        year_range = int(year_end) - int(year_start)
        # print(year_range)
        arr = []
        arr_years = []
        arr_temp = []
        arr_hum = []
        arr_rain = []
        tot_month = []
        tot_days = []

        for i in range(0, year_range+1):
            arr_years.append(int(year_start)+i)
            if year % 4 == 0:
                feb = 29
            else:
                feb = 28
            days = [31, feb, 31, 30, 30, 30, 31, 31, 30, 31, 30, 31]
            year = year + 1
            if (i == year_range):
                stp = stop
            else:
                stp = 12
            tot_month.append(stp)
            for j in range(start, stp):
                # print(months[j])
                arr.append(months[j])
                tot_days.append(days[j])
                for k in range(1, days[j]+1):
                    day = str(j) + str(k)
                    date = [[day]]
                    # print(date)
                    temp = tree_model_temperature.predict(date)[0]
                    hum = tree_model_humidity.predict(date)[0]
                    rain = tree_model_rainfall.predict(date)[0]

                    arr_temp.append(round(temp, 2))
                    arr_hum.append(round(hum, 2))
                    arr_rain.append(round(rain, 2))
            start = 0

        return {
            'temp': arr_temp,
            'hum': arr_hum,
            'rain': arr_rain,
            'years': arr_years,
            'months': arr,
            'days': tot_days,
            'totalmonth': tot_month
        }

    return {'message': 'Laurent Saint'}
