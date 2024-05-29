from django.urls import path, include, re_path  # Import include to include DRF's URLs
from django.views.generic import TemplateView
from app_accounts.views import UserListView, UserApprovalView, DisableUserView, EnableUserView, CustomTokenObtainPairView, EditUserView, DeleteUserView,  UserActivationView  


urlpatterns = [
    path('child/',include('app_child_data.urls') ),
    path('calendar/',include('app_calendar.urls') ),

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    # path('accounts/', include('app_accounts.urls')),

    path('user_approval/<int:user_id>/<str:action>/', UserApprovalView.as_view(), name='user_approval'),
    path('users/<int:pk>/disable/', DisableUserView.as_view(), name='disable_user'),
    path('users/<int:pk>/enable/', EnableUserView.as_view(), name='enable_user'),
    path('users/<int:pk>/delete/', DeleteUserView.as_view(), name='delete_user'),
    path('api/users/<int:pk>/edit/', EditUserView.as_view(), name='edit-user'),



    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/', UserListView.as_view(), name='user-list'),


]




# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]