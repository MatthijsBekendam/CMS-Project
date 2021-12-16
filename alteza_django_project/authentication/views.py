from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import CustomUserSerializer
from .models import CustomUser


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer_class = CustomUserSerializer

    def get(self, format=None):
        """Returns all objects within the Custom user model"""
        queryset = CustomUser.objects.all()
        if len(queryset) > 0:
            serializer = CustomUserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"Bad Request:", "No Users Found!"}, status=status.HTTP_404_NOT_FOUND)
