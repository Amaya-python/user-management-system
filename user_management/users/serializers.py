from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ["id", "created_at"]

  
    def validate_first_name(self, value):
        value = value.strip()

        if len(value) < 2:
            raise serializers.ValidationError(
                "First name must contain at least 2 characters."
            )

        if not value.replace(" ", "").isalpha():
            raise serializers.ValidationError(
                "First name can contain only letters."
            )

        return value.title()

 
    def validate_last_name(self, value):
        value = value.strip()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Last name must contain at least 2 characters."
            )

        if not value.replace(" ", "").isalpha():
            raise serializers.ValidationError(
                "Last name can contain only letters."
            )

        return value.title()

    def validate_email(self, value):
        value = value.strip().lower()

        queryset = UserProfile.objects.filter(email__iexact=value)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )

        return value

   
    def validate_age(self, value):

        if value < 18:
            raise serializers.ValidationError(
                "User must be at least 18 years old."
            )

        if value > 100:
            raise serializers.ValidationError(
                "Age cannot be greater than 100."
            )

        return value