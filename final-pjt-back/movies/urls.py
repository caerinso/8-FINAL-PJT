from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.movies_data),
    path('movies/', views.movie_list),
    path('recommend/', views.recommend_movie),
    path('serchmovie/', views.search_movie),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('movies/<int:movie_pk>/likes/', views.movie_likes),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('movies/<int:movie_pk>/comments/', views.comment_create),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

]
