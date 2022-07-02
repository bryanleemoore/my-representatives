from django.shortcuts import render, redirect
from rest_framework.views import APIView
import requests
from rest_framework import status
from rest_framework.response import Response
import environ 
import os

civic_key = (os.environ.get("CIVIC_KEY", 'dev default value'))
prop_key = (os.environ.get("PROP_KEY", 'dev default value'))

class Representatives(APIView):

    def get(self, request, format=None):
   
     
        address = request.GET.get('address')
        print('-----------')
        print(address)

        houseParams = {'key': civic_key, 'address' : address, 'roles' : 'legislatorLowerBody', 'levels': 'country'}
        senatorParams = {'key': civic_key, 'address' : address, 'roles' : 'legislatorUpperBody', 'levels': 'country'}

        house = requests.get('https://www.googleapis.com/civicinfo/v2/representatives', params=houseParams)
        senators = requests.get('https://www.googleapis.com/civicinfo/v2/representatives', params=senatorParams)
     
   
     
        houseJson = house.json()
      

        for i in houseJson['divisions']:
            houseDistrict = houseJson['divisions'][i]['name']

        houseTitle = houseJson['offices'][0]['name']

        houseOfficials = [houseJson['officials'][0]]

        houseOcd_id = houseJson['offices'][0]['divisionId']
        houseRep = {
            'district' : houseDistrict,
            'title' : houseTitle,
            'officials' : houseOfficials,
            'ocd_id' : houseOcd_id
        }
        #print(house.text)
        senatorJson = senators.json()
       # print(senators.text)

        for i in senatorJson['divisions']:
            senatorDistrict = senatorJson['divisions'][i]['name']

        senatorTitle = senatorJson['offices'][0]['name']

        senatorOfficials = [senatorJson['officials'][0],senatorJson['officials'][1]]

        senatorOcd_id = senatorJson['offices'][0]['divisionId']
        senatorRep = {
            'district' : senatorDistrict,
            'title' : senatorTitle,
            'officials' : senatorOfficials,
            'ocd_id' : senatorOcd_id
        }

        reps = {
            'house' : houseRep,
            'senators' : senatorRep
        }
 
        return Response(reps, status=status.HTTP_200_OK)


class MemberID(APIView):

    def get(self, request, format=None):
        firstname = request.GET.get('firstname')
        lastname = request.GET.get('lastname')
        ocd_id = request.GET.get('ocd_id')
        chamber = request.GET.get('chamber')


        if chamber == 'senate':
            url = 'https://api.propublica.org/congress/v1/117/senate/members.json'
            headers = {'X-API-Key': prop_key}

            members = requests.get(url, headers=headers)
            members = members.json()
            for i in members['results']:
                for z in i['members']:
                    if z['ocd_id'] == ocd_id:
                        if z['last_name'] == lastname:
                            print(firstname, lastname, ocd_id)
                            print(z['id'])
                            return Response(z['id'], status=status.HTTP_200_OK)
        else:
            url = 'https://api.propublica.org/congress/v1/117/house/members.json'
            headers = {'X-API-Key': prop_key}

            members = requests.get(url, headers=headers)
            members = members.json()
            for i in members['results']:
                for z in i['members']:
                    if z['ocd_id'] == ocd_id:
                        if z['last_name'] == lastname:
                            print(firstname, lastname, ocd_id)
                            print(z['id'])
                            return Response(z['id'], status=status.HTTP_200_OK)           
                        
            
     
     
        return Response('NOT FOUND', status=status.HTTP_404_NOT_FOUND)



class Votes(APIView):

    def get(self, request, format=None):

        url = 'https://api.propublica.org/congress/v1/members/' + request.GET.get('memberID') + '/votes.json'
        headers = {'X-API-Key': prop_key}

        votes = requests.get(url, headers=headers)    

        votes = votes.json()

  
     
 

    
        return Response(votes, status=status.HTTP_200_OK)



class Information(APIView):

    def get(self, request, format=None):

        url = 'https://api.propublica.org/congress/v1/members/' + request.GET.get('memberID') + '.json'
        headers = {'X-API-Key': prop_key}

        info = requests.get(url, headers=headers)    

        info = info.json()
        print(info)


        return Response(info, status=status.HTTP_200_OK)