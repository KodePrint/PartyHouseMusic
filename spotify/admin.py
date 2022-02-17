from django.contrib import admin
from .models import SpotifyToken

# Register your models here.

@admin.register(SpotifyToken)
class SpotifyTokenAdmin(admin.ModelAdmin):
    '''Admin View for SpotifyTokne'''

    # list_display = ('',)
    # list_filter = ('',)
    # inlines = [
    #     Inline,
    # ]
    # raw_id_fields = ('',)
    # readonly_fields = ('',)
    # search_fields = ('',)
    # date_hierarchy = ''
    # ordering = ('',)