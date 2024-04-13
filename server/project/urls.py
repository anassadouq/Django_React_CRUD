from django.urls import path
from app import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addItem),
    path('<int:id>/', views.deleteEmployee),
    path('show/<int:id>/', views.showEmployee),
    path('update/<int:id>/', views.updateEmployee),
]