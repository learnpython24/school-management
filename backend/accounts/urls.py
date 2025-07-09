# backend/accounts/urls.py
from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, UserDetailView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserDetailView.as_view(), name='profile'),
]