# api/views.py

from rest_framework.generics import ListCreateAPIView
from django.http import JsonResponse
import json


from rest_framework.response import Response
from rest_framework import status
from .models import ChildInformation, Parent, ChildHealthInformation
from .serializers import ChildInformationSerializer, ParentSerializer, ChildHealthInformationSerializer
from rest_framework import serializers
from django.views.decorators.csrf import csrf_exempt


class ChildInformationListAPIView(ListCreateAPIView):
    """
    API endpoint to retrieve a list of children or add a new child.
    """
    queryset = ChildInformation.objects.all()
    serializer_class = ChildInformationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    


class ParentListCreateAPIView(ListCreateAPIView):
    """
    API endpoint to retrieve a list of parent information or add new parent information.
    """
    serializer_class = ParentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        return Parent.objects.all()



class ChildHealthInformationListAPIView(ListCreateAPIView):
    """
    API endpoint to retrieve a list of child health information or add new health information.
    """
    queryset = ChildHealthInformation.objects.all()
    serializer_class = ChildHealthInformationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    


# CRUD ==============================================================================
    
@csrf_exempt
def save_child_information(request):
    json_data = json.loads(request.body)


    if request.method == 'POST':
        # Extract child information from the request
        child_data = {
            'first_name': json_data.get('first_name'),
            'last_name': json_data.get('last_name'),
            'middle_name': json_data.get('middle_name'),
            'suffix': json_data.get('suffix'),
            'date_of_birth': json_data.get('date_of_birth'),
            'aim': json_data.get('aim'),
            'gender': json_data.get('gender'),
            'birth_weight': json_data.get('birth_weight'),
            'birth_order': json_data.get('birth_order'),
        }

        # Update the 'archieved' field based on the 'aim' value
        aim = json_data.get('aim')
        if aim and int(aim) > 60:
            child_data['is_archieved'] = True
        else:
            child_data['is_archieved'] = False
        # Save child information
        child = ChildInformation.objects.create(**child_data)

        # Extract parent information from the request
        parent_data = {
            'child': child,
            'father_first_name': json_data.get('father_first_name'),
            'father_last_name': json_data.get('father_last_name'),
            'father_middle_name': json_data.get('father_middle_name'),
            'father_suffix': json_data.get('father_suffix'),
            'father_age': json_data.get('father_age'),
            'father_ethnicity': json_data.get('father_ethnicity'),
            'father_occupation': json_data.get('father_occupation'),
            'father_religion': json_data.get('father_religion'),
            'father_contact_number': json_data.get('father_contact_number'),

            'mother_first_name': json_data.get('mother_first_name'),
            'mother_last_name': json_data.get('mother_last_name'),
            'mother_middle_name': json_data.get('mother_middle_name'),
            'mother_suffix': json_data.get('mother_suffix'),
            'mother_age': json_data.get('mother_age'),
            'mother_ethnicity': json_data.get('mother_ethnicity'),
            'mother_occupation': json_data.get('mother_occupation'),
            'mother_religion': json_data.get('mother_religion'),
            'mother_contact_number': json_data.get('mother_contact_number'),

            'guardian_first_name': json_data.get('guardian_first_name'),
            'guardian_last_name': json_data.get('guardian_last_name'),
            'guardian_middle_name': json_data.get('guardian_middle_name'),
            'guardian_suffix': json_data.get('guardian_suffix'),
            'guardian_age': json_data.get('guardian_age'),
            'guardian_ethnicity': json_data.get('guardian_ethnicity'),
            'guardian_occupation': json_data.get('guardian_occupation'),
            'guardian_religion': json_data.get('guardian_religion'),
            'guardian_contact_number': json_data.get('guardian_contact_number'),
        }
        # Save parent information
        parent = Parent.objects.create(**parent_data)

        # Extract child health information from the request
        health_data = {
            'child': child,
            'date_of_weighing': json_data.get('date_of_weighing'),
            'weight': json_data.get('weight'),
            'height': json_data.get('height'),
            'muac': json_data.get('muac'),
            'bpe': json_data.get('bpe'),
            'wfa': json_data.get('wfa'),
            'lfa': json_data.get('lfa'),
            'wfl': json_data.get('wfl'),
        }
        # Save child health information
        ChildHealthInformation.objects.create(**health_data)
        # Respond with success message or redirect
        return JsonResponse({'message': 'Data saved successfully.'})

    # Handle GET requests or other methods
    return JsonResponse({'error': 'Invalid request method.'})




def get_all_child_information(request):
    if request.method == 'GET':
        children = ChildInformation.objects.all()
        child_data = []

        for child in children:
            child_info = {
                'child': {
                    'first_name': child.first_name,
                    'last_name': child.last_name,
                    'middle_name': child.middle_name,
                    'suffix': child.suffix,
                    'date_of_birth': child.date_of_birth,
                    'gender': child.gender,
                    'birth_weight': child.birth_weight,
                    'birth_order': child.birth_order,
                    'aim': child.aim
                },
                'parent': {
                    'father_first_name': child.parent.father_first_name,
                    'father_last_name': child.parent.father_last_name,
                    'father_middle_name': child.parent.father_middle_name,
                    'father_suffix': child.parent.father_suffix,
                    'father_age': child.parent.father_age,
                    'father_ethnicity': child.parent.father_ethnicity,
                    'father_occupation': child.parent.father_occupation,
                    'father_religion': child.parent.father_religion,
                    'father_contact_number': child.parent.father_contact_number,

                    'mother_first_name': child.parent.mother_first_name,
                    'mother_last_name': child.parent.mother_last_name,
                    'mother_middle_name': child.parent.mother_middle_name,
                    'mother_suffix': child.parent.mother_suffix,
                    'mother_age': child.parent.mother_age,
                    'mother_ethnicity': child.parent.mother_ethnicity,
                    'mother_occupation': child.parent.mother_occupation,
                    'mother_religion': child.parent.mother_religion,
                    'mother_contact_number': child.parent.mother_contact_number,

                    'guardian_first_name': child.parent.guardian_first_name,
                    'guardian_last_name': child.parent.guardian_last_name,
                    'guardian_middle_name': child.parent.guardian_middle_name,
                    'guardian_suffix': child.parent.guardian_suffix,
                    'guardian_age': child.parent.guardian_age,
                    'guardian_ethnicity': child.parent.guardian_ethnicity,
                    'guardian_occupation': child.parent.guardian_occupation,
                    'guardian_religion': child.parent.guardian_religion,
                    'guardian_contact_number': child.parent.guardian_contact_number
                },
                'child_health': {
                    'date_of_weighing': child.childhealthinformation.date_of_weighing,
                    'weight': child.childhealthinformation.weight,
                    'height': child.childhealthinformation.height,
                    'muac': child.childhealthinformation.muac,
                    'bpe': child.childhealthinformation.bpe,
                    'wfa': child.childhealthinformation.wfa,
                    'lfa': child.childhealthinformation.lfa,
                    'wfl': child.childhealthinformation.wfl
                }
            }
            child_data.append(child_info)

        return JsonResponse({'children': child_data})
    else:
        return JsonResponse({'error': 'Invalid request method.'})





def get_all_child_information(request):
    if request.method == 'GET':
        children = ChildInformation.objects.all()
        child_data = []

        for child in children:
            child_info = {
                'id': child.id,
                'first_name': child.first_name,
                'last_name': child.last_name,
                'middle_name': child.middle_name,
                'suffix': child.suffix,
                'date_of_birth': child.date_of_birth,
                'gender': child.gender,
                'birth_weight': str(child.birth_weight),
                'birth_order': child.birth_order,
                'aim': child.aim,
                'is_archieved': child.is_archieved,
                'parent': {},
                'child_health': {}
            }

            # Fetch parent information
            parent_info = child.parent_set.first()
            if parent_info:
                child_info['parent'] = {
                    'father_first_name': parent_info.father_first_name,
                    'father_last_name': parent_info.father_last_name,
                    'father_middle_name': parent_info.father_middle_name,
                    'father_suffix': parent_info.father_suffix,
                    'father_age': parent_info.father_age,
                    'father_ethnicity': parent_info.father_ethnicity,
                    'father_occupation': parent_info.father_occupation,
                    'father_religion': parent_info.father_religion,
                    'father_contact_number': parent_info.father_contact_number,

                    'mother_first_name': parent_info.mother_first_name,
                    'mother_last_name': parent_info.mother_last_name,
                    'mother_middle_name': parent_info.mother_middle_name,
                    'mother_suffix': parent_info.mother_suffix,
                    'mother_age': parent_info.mother_age,
                    'mother_ethnicity': parent_info.mother_ethnicity,
                    'mother_occupation': parent_info.mother_occupation,
                    'mother_religion': parent_info.mother_religion,
                    'mother_contact_number': parent_info.mother_contact_number,

                    'guardian_first_name': parent_info.guardian_first_name,
                    'guardian_last_name': parent_info.guardian_last_name,
                    'guardian_middle_name': parent_info.guardian_middle_name,
                    'guardian_suffix': parent_info.guardian_suffix,
                    'guardian_age': parent_info.guardian_age,
                    'guardian_ethnicity': parent_info.guardian_ethnicity,
                    'guardian_occupation': parent_info.guardian_occupation,
                    'guardian_religion': parent_info.guardian_religion,
                    'guardian_contact_number': parent_info.guardian_contact_number,
                }

            # Fetch child health information
            health_info = child.childhealthinformation_set.first()
            if health_info:
                child_info['child_health'] = {
                    'date_of_weighing': health_info.date_of_weighing,
                    'weight': str(health_info.weight),
                    'height': str(health_info.height),
                    'muac': str(health_info.muac),
                    'bpe': health_info.bpe,
                    'wfa': health_info.wfa,
                    'lfa': health_info.lfa,
                    'wfl': health_info.wfl,
                }

            child_data.append(child_info)

        return JsonResponse({'children': child_data})
    else:
        return JsonResponse({'error': 'Invalid request method.'})