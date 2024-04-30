from django.urls import path, include  # Import include to include DRF's URLs

urlpatterns = [
    path('child/',include('app_child_data.urls') ),
    path('calendar/',include('app_calendar.urls') ),

]
