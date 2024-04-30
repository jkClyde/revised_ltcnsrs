# api/serializers.py

from rest_framework import serializers
from .models import ChildInformation, Parent, ChildHealthInformation

class ChildInformationSerializer(serializers.ModelSerializer):
    """
    Serializer for ChildInformation model.
    """
    class Meta:
        model = ChildInformation
        fields = '__all__'

class ParentSerializer(serializers.ModelSerializer):
    """
    Serializer for Parent model.
    """
    class Meta:
        model = Parent
        fields = '__all__'


class ChildHealthInformationSerializer(serializers.ModelSerializer):
    """
    Serializer for ChildHealthInformation model.
    """
    class Meta:
        model = ChildHealthInformation
        fields = '__all__'

