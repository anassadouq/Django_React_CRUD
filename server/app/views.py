from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from app.models import React
from .serializer import ReactSerializer

@api_view(['GET'])
def getData(request):
    react = React.objects.all()
    serializer = ReactSerializer(react, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
    serializer = ReactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)  # Success case
    return Response(serializer.errors, status=400)  # Error case

@api_view(['GET'])
def showEmployee(request, id):
    react = get_object_or_404(React, pk=id)
    serializer = ReactSerializer(react)
    return Response(serializer.data)

@api_view(['PUT'])
def updateEmployee(request, id):
    react = get_object_or_404(React, pk=id)
    serializer = ReactSerializer(react, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def deleteEmployee(request, id):
    try:
        react = React.objects.get(pk=id)
    except React.DoesNotExist:
        print("React not found.")
        return Response({'error': 'React Not Found'}, status=404)

    react.delete()
    print("react deleted.")
    return Response({'message': 'react deleted successfully'}, status=204)
