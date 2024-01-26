import React, { useState } from 'react'

export default function useImageUpload() {
    const [isImageLoading, setIsLoading] = useState(false)
    const [profileImage, setProfileImage] = useState('')
    const [imageUrl, setImageUrl] = useState(undefined)
    const [imagePreview, setImagePreview] = useState(null)

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleImageUpload = async (handleSubmit, values) => {
        setIsLoading(true)
        try {
            if (profileImage && (
                profileImage.type == 'image/png' ||
                profileImage.type == 'image/jpg' ||
                profileImage.type == 'image/jpeg' ||
                profileImage.type == 'image/webp'
            )) {
                const image = new FormData()
                image.append('file', profileImage)
                image.append('cloud_name', 'shajib')
                image.append('upload_preset', 'shajib-cloud')

                fetch('https://api.cloudinary.com/v1_1/shajib/image/upload', {
                    method: "POST",
                    body: image
                })
                    .then(res => res.json())
                    .then(data => {
                        setImageUrl(data.url);
                        // console.log(imageUrl)
                        setIsLoading(false)
                        handleSubmit(data.url, values)
                    })
            }
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }
    return {
        handleImageChange,
        handleImageUpload,
        isImageLoading,
        imagePreview,
        imageUrl
    }
}
