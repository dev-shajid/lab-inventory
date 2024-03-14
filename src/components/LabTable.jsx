'use client'

import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical, HiPlus, HiSearch } from "react-icons/hi";
import BlurImage from "@/components/BlurImage";
import { ActionIcon, Autocomplete, Button, LoadingOverlay, Menu, Modal, NumberInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { validateAddItemManagerForm } from "@/helper/validate";
import { useFormik } from "formik";
import { CiCamera } from "react-icons/ci";
import useImageUpload from "@/components/useImageUpload";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/ContextProvider";
import useApi from "@/lib/useApi";
import Overlay from "./Overlay";

export default function LabTable({ lab }) {
    const { user } = useUserContext()
    const [openedActionModal, { open: openActionModal, close: closeActionModal }] = useDisclosure(false);
    const [openedAddNewItemModal, { open: openAddNewItemModal, close: closeAddNewItemModal }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState({})
    const [filterValue, setFilterValue] = useState("");
    const [filterLists, setFilterLists] = useState([]);

    const { getLabItems, editLabItem, addRequest, addLabItem, deleteLabItem } = useApi()

    const { data: items, isLoading } = getLabItems({ lab })

    useEffect(() => {
        setFilterLists(items)
    }, [items])

    const handleDelete = (id) => {
        // setOverlayLoading(true)
        let loadingPromise = toast.loading("Loading...")
        deleteLabItem.mutate({ id, lab }, {
            onSuccess: (data) => {
                toast.success("Succesfully Delted!", { id: loadingPromise })
            },
            onError: (e) => {
                console.log(e)
                toast.error(e?.message || "Some error arised", { id: loadingPromise })
            },
        })


    }

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
        const { isImageLoading, handleImageChange, errorImage, handleImageUpload, imagePreview, imageUrl } = useImageUpload()
        const [addItemErrors, setAddItemErrors] = useState({})

        function handleSubmit(url, values) {
            let loadingPromise = toast.loading("Loading...")
            try {
                formik.setFieldValue('image', url)
                addLabItem.mutate({ data: { ...values, image: url }, lab }, {
                    onSuccess: (data) => {
                        toast.success("Item Added!", { id: loadingPromise })
                        // setItems((pre) => [data, ...pre])
                        // setFilterLists((pre) => [data, ...pre])
                        closeAddNewItemModal()
                    },
                    onError: (e) => {
                        console.log(e)
                        toast.error(e?.message || "Some error arised", { id: loadingPromise })
                    },
                })
            } catch (error) {
                toast.error(error.message, { id: loadingPromise })
            }
            finally {
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
                                        required
                                    />
                                </div> :
                                <div className="w-[200px] overflow-hidden">
                                    {
                                        (imagePreview || formik.values.image) && (
                                            <img className="max-w-full max-h-full object-cover" src={imagePreview || formik.values.image} alt="profileImage" />
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

    const ActionModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, damaged: selectedItem.damaged, amount: undefined })

        const handleChange = (value, name) => {
            // console.log({value, name})
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            // setOverlayLoading(true)
            let loadingPromise = toast.loading("Loading...")
            e.preventDefault()
            let itemObj = {
                // ...selectedItem,
                ...formValue,
                itemId: selectedItem.id,
                req_type: selectedItem?.action == 1 ? 'restock' : selectedItem?.action == 2 ? 'repair' : 'demand',
                role: user?.role,
                lab: user?.lab,
            }

            addRequest.mutate({ data: itemObj }, {
                onSuccess: () => {
                    toast.success("Succesfully sent request!", { id: loadingPromise })
                    setFormValue({ name: '', description: '', available: '', damaged: '', amount: null })
                    closeActionModal()
                },
                onError: (e) => {
                    console.log(e)
                    toast.error(e?.message || "Some error arised", { id: loadingPromise })
                },
            })
        }


        const handleEdit = (e) => {
            // setOverlayLoading(true)
            let loadingPromise = toast.loading("Loading...")
            e.preventDefault()
            const { amount, ...i } = formValue
            editLabItem.mutate({ data: i, id: selectedItem.id, lab }, {
                onSuccess: () => {
                    // setRefetchItems(e => e + 1)
                    toast.success("Succesfully Edited!", { id: loadingPromise })
                    setFormValue({ name: '', description: '', available: '', damaged: '', amount: null })
                    closeActionModal()
                },
                onError: (e) => {
                    console.log(e)
                    toast.error(e?.message || "Some error arised", { id: loadingPromise })
                },
            })

        }

        return (
            <Modal opened={openedActionModal} onClose={closeActionModal} title={<div className="title mt-6">{selectedItem.title}</div>}>
                <form
                    className="space-y-4"
                    onSubmit={selectedItem.action ? handleSubmit : handleEdit}
                >
                    <TextInput
                        label="Name"
                        readOnly
                        value={formValue.name}
                    />
                    <TextInput
                        label="Description"
                        name="description"
                        placeholder='Enter description of item'
                        onChange={(e) => handleChange(e.target.value, 'description')}
                        withAsterisk
                        required
                        value={formValue.description}
                    />
                    <NumberInput
                        min={0}
                        label="Available"
                        name="available"
                        placeholder='Amount of available item'
                        onChange={(e) => handleChange(e, 'available')}
                        withAsterisk
                        required
                        value={formValue.available}
                    />
                    <NumberInput
                        min={0}
                        label="Damaged"
                        name="damaged"
                        placeholder='Amount of damaged items'
                        onChange={(e) => handleChange(e, 'damaged')}
                        withAsterisk
                        required
                        value={formValue.damaged}
                    />
                    {selectedItem?.action && <NumberInput
                        min={0}
                        label="Amount"
                        name="amount"
                        placeholder='Amount of request items'
                        onChange={(e) => handleChange(e, 'amount')}
                        withAsterisk
                        required
                        value={formValue.amount}
                    // error={errors.email}
                    />}
                    <div className="flex items-center justify-center gap-4">
                        <Button type="submit" fullWidth>Submit</Button>
                        <Button onClick={closeActionModal} fullWidth variant="outline" color="red">Cancel</Button>
                    </div>
                </form>

            </Modal>
        )
    }

    return (
        <div className="space-y-2">
            <div className="rounded-md space-y-3 overflow-x-auto max-w-full border border-blight-1 relative bg-white p-4">
                <div className="sticky left-0 space-y-2">
                    <div className="flex items-center justify-between flex-col lg:flex-row gap-4">
                        <TextInput
                            className="w-full lg:max-w-[44%]"
                            placeholder="Search by name..."
                            leftSectionPointerEvents="none"
                            leftSection={<HiSearch className="text-default-300" />}
                            value={filterValue}
                            onChange={onSearchChange}
                        />
                        {(user?.role == 'asistant' && user?.lab == lab) &&
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
                        <span className="text-gray-500 text-xs font-medium">Total {filterLists?.length} items</span>
                    </div>
                </div>
                {
                    filterLists?.length ?
                        <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                            <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                                <tr>
                                    <th>SL NO.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Available</th>
                                    <th>Damaged</th>
                                    {(user?.role == 'asistant' && user?.lab == lab) && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterLists.map((item, i) => (
                                        <tr key={i} className="odd:bg-white even:bg-gray-100 border-b">
                                            <td>{i + 1}</td>
                                            <td className="max-w-[80px] p-1">
                                                <div className={'overflow-hidden min-w-min'}>
                                                    {
                                                        item.image ?
                                                            <BlurImage src={item.image} alt='item image' /> :
                                                            <></>
                                                    }
                                                </div>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.available}</td>
                                            <td>{item.damaged}</td>
                                            {(user?.role == 'asistant' && user?.lab == lab) &&
                                                <td>
                                                    <>
                                                        <Menu width={200} shadow="md">
                                                            <Menu.Target>
                                                                <ActionIcon
                                                                    variant="transparent"
                                                                    size='sm'
                                                                    color="#000"
                                                                >
                                                                    <HiOutlineDotsVertical size={16} />
                                                                </ActionIcon>
                                                            </Menu.Target>

                                                            <Menu.Dropdown>
                                                                <Menu.Item
                                                                    onClick={() => {
                                                                        setSelectedItem({ ...item, title: "Request for Restock", action: 1 })
                                                                        openActionModal()
                                                                    }}
                                                                >
                                                                    Request For Restock
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    onClick={() => {
                                                                        openActionModal()
                                                                        setSelectedItem({ ...item, title: "Request for Repair", action: 2 })
                                                                    }}
                                                                >
                                                                    Request For Repair
                                                                </Menu.Item>
                                                                <Menu.Divider />
                                                                <Menu.Item
                                                                    color="blue"
                                                                    onClick={() => {
                                                                        openActionModal()
                                                                        setSelectedItem({ ...item, title: "Edit", action: null })
                                                                    }}
                                                                >
                                                                    Edit Item
                                                                </Menu.Item>
                                                                <Menu.Item
                                                                    color="red"
                                                                    onClick={() => handleDelete(item.id)}
                                                                >
                                                                    Delete Item
                                                                </Menu.Item>
                                                            </Menu.Dropdown>
                                                        </Menu>
                                                    </>
                                                </td>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table> :
                        <></>
                }
            </div>
            <ActionModal />
            <AddNewItemModal />
            <Overlay isLoading={editLabItem.isPending || deleteLabItem.isPending || addLabItem.isPending}/>
        </div>
    );
}
