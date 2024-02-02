'use client'

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Autocomplete, Button, LoadingOverlay, Modal, NumberInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Products from "@/components/Products";
import { useFormik } from "formik";
import { validateAddItemManagerForm } from "@/helper/validate";
import { useUserContext } from "@/context/ContextProvider";
import { CiCamera } from "react-icons/ci";
import useImageUpload from "@/components/useImageUpload";
import toast from "react-hot-toast";

export default function ManagerAction() {
    const [openedReqNewItemModal, { open: openReqNewItemModal, close: closeReqNewItemModal }] = useDisclosure(false);
    const [openedAddNewItemModal, { open: openAddNewItemModal, close: closeAddNewItemModal }] = useDisclosure(false);
    const [filterValue, setFilterValue] = useState("");
    const [filterLists, setFilterLists] = useState([]);
    const [items, setItems] = useState([])
    const [overlayLoading, setOverlayLoading] = useState(false)
    const { refetchUserTable1, dispatch, user } = useUserContext()

    const getAllItems = () => {
        fetch('/api/item', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                console.log(data)
                setItems(data)
                setFilterLists(data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getAllItems()
    }, [])

    const onSearchChange = (e) => {
        let value = e.target.value
        if (value) {
            setFilterValue(value);
            setFilterLists(items.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
        } else {
            setFilterValue("");
            setFilterLists(items);
        }
    }

    const AddNewItemModal = () => {
        const { isImageLoading, handleImageChange, handleImageUpload, errorImage, imagePreview, imageUrl } = useImageUpload()
        const [addItemErrors, setAddItemErrors] = useState({})

        function handleSubmit(url, values) {
            try {
                let loadingPromise = toast.loading("Loading...")
                formik.setFieldValue('image', url)
                fetch('/api/item/addItem', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...values, image: url }),
                })
                    .then(res => res.json())
                    .then(data => {
                        setOverlayLoading(false)
                        if (data) {
                            toast.success("Item Added!", { id: loadingPromise })
                            setItems((pre) => [data, ...pre])
                            setFilterLists((pre) => [data, ...pre])
                        }
                        else toast.error("Error to uploading item!", { id: loadingPromise })
                        closeAddNewItemModal()
                    })
            } catch (error) {
                toast.error(error.message, { id: loadingPromise })
                setOverlayLoading(false)
            }
        }

        const formik = useFormik({
            initialValues: {
                name: '', description: '', available: '', damaged: '', image: ''
            },
            validate: async (values) => {
                setAddItemErrors(await validateAddItemManagerForm(values))
            },
            validateOnBlur: false,
            validateOnChange: false,
            onSubmit: async (values) => {
                if (!Object.keys(addItemErrors).length) {
                    setOverlayLoading(true)
                    handleImageUpload(handleSubmit, values, setOverlayLoading)
                }
            }
        })


        useEffect(() => {
            if (errorImage) {
                alert("Image is required!")
            }
        }, [errorImage])

        return (
            <Modal opened={openedAddNewItemModal} onClose={closeAddNewItemModal} title={<div className="title mt-6">Add new Item</div>}>
                <div className="mb-4">
                    {
                        isImageLoading ?
                            <div className="title">Uploading...</div> :
                            !imagePreview && !formik.values.image ?
                                <div>
                                    <Button component="label" htmlFor="open_image" leftSection={<CiCamera size={20} />} size="xs" variant="outline">Select Image</Button>
                                    <input
                                        id="open_image"
                                        className="hidden"
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg, image/webp"
                                        onChange={handleImageChange}
                                    />
                                </div> :
                                <div className="w-[200px] overflow-hidden">
                                    {
                                        formik.values.image || imagePreview && (
                                            <img className="max-w-full max-h-full object-cover" src={formik.values.image || imagePreview} alt="profileImage" />
                                        )
                                    }
                                </div>


                    }
                </div>
                <form
                    className="space-y-4"
                    onSubmit={formik.handleSubmit}
                >
                    <TextInput
                        label="Name"
                        placeholder="Enter item name"
                        withAsterisk
                        {...formik.getFieldProps('name')}
                        error={addItemErrors.name ? true : false}
                        helperText={addItemErrors.name}
                    />
                    <TextInput
                        label="Description"
                        placeholder="Enter item description"
                        {...formik.getFieldProps('description')}
                        error={addItemErrors.description ? true : false}
                        helperText={addItemErrors.description}
                    />
                    <NumberInput
                        min={0}
                        label="Available"
                        placeholder="Enter amount of available item"
                        withAsterisk
                        value={formik.values.available}
                        onChange={(e) => formik.setFieldValue('available', e)}
                        error={addItemErrors.available ? true : false}
                        helperText={addItemErrors.available}
                    />
                    <NumberInput
                        min={0}
                        label="Damaged"
                        placeholder="Enter amount of damaged item"
                        withAsterisk
                        value={formik.values.damaged}
                        onChange={(e) => formik.setFieldValue('damaged', e)}
                        error={addItemErrors.damaged ? true : false}
                        helperText={addItemErrors.damaged}
                    />
                    <div className="flex items-center justify-center gap-4">
                        <Button type="submit" fullWidth>Submit</Button>
                        <Button onClick={closeAddNewItemModal} fullWidth variant="outline" color="red">Cancel</Button>
                    </div>
                </form>

            </Modal >
        )
    }

    return (
        <>
            <div className="rounded-md space-y-3 overflow-x-auto max-w-full border border-blight-1 relative bg-white p-4">
                <div className="">
                    <div className="flex items-center justify-between flex-col lg:flex-row gap-4">
                        <TextInput
                            className="w-full lg:max-w-[44%]"
                            placeholder="Search by name..."
                            leftSectionPointerEvents="none"
                            leftSection={<HiSearch className="text-default-300" />}
                            value={filterValue}
                            onChange={onSearchChange}
                        />
                        {user.role == 'manager' &&
                            <Button
                                size="xs"
                                onClick={openAddNewItemModal}
                                color="#000"
                            >
                                Add New Item
                            </Button>
                        }
                    </div>
                    <div className="flex">
                        <span className="text-gray-500 text-xs font-medium">Total {filterLists.length} items</span>
                    </div>
                </div>
                <Products products={filterLists} />
            </div>
            <LoadingOverlay visible={overlayLoading} overlayProps={{ blur: 2 }} loader={<></>} />
            <AddNewItemModal />
        </>
    );
}