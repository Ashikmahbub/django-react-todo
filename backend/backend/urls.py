from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo.views import TaskViewSet, RegisterView   # 👈 you can import both in one line
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet, basename="task")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # JWT authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Registration endpoint
    path('api/register/', RegisterView.as_view(), name='register'),
]
