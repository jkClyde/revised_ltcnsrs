from django.urls import path
from .views import ChildInformationListAPIView,  ChildHealthInformationListAPIView, ParentListCreateAPIView,save_child_information, get_all_child_information

urlpatterns = [
    path('children/', ChildInformationListAPIView.as_view(), name='children-list'),
    path('parents/', ParentListCreateAPIView.as_view(), name='parents-list'),
    path('child-health/', ChildHealthInformationListAPIView.as_view(), name='child-health-list'),

    
    path('add-child/', save_child_information, name='Add Child Info'),
    path('view-child/', get_all_child_information, name='View Child Info'),
]