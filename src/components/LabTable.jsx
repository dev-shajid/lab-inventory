'use client'

import React, { useState } from "react";
import { HiOutlineDotsVertical, HiPlus, HiSearch } from "react-icons/hi";
import BlurImage from "@/components/BlurImage";
import { ActionIcon, Autocomplete, Button, LoadingOverlay, Menu, Modal, NumberInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { validateAddItemManagerForm } from "@/helper/validate";
import { useFormik } from "formik";
import { CiCamera } from "react-icons/ci";
import useImageUpload from "@/components/useImageUpload";
import toast from "react-hot-toast";

export default function LabTable({ lists }) {
    const [openedActionModal, { open: openActionModal, close: closeActionModal }] = useDisclosure(false);
    const [openedReqNewItemModal, { open: openReqNewItemModal, close: closeReqNewItemModal }] = useDisclosure(false);
    const [openedAddNewItemModal, { open: openAddNewItemModal, close: closeAddNewItemModal }] = useDisclosure(false);
    const [selectedItem, setSelectedItem] = useState({})
    const [filterValue, setFilterValue] = useState("");
    const [filterLists, setFilterLists] = useState(lists);
    const [items, setItems] = useState([])
    const [overlayLoading, setOverlayLoading] = useState(false)

    const onSearchChange = (e) => {
        let value = e.target.value
        if (value) {
            setFilterValue(value);
            setFilterLists(lists.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
        } else {
            setFilterValue("");
            setFilterLists(lists);
        }
    }


    const AddNewItemModal = () => {
        const { isImageLoading, handleImageChange, handleImageUpload, imagePreview, imageUrl } = useImageUpload()
        const [addItemErrors, setAddItemErrors] = useState({})

        function handleSubmit(url, values) {
            let loadingPromise = toast.loading("Loading...")
            formik.setFieldValue('image', url)
            fetch('https://lab-inventory.vercel.app/api/item/addItem', {
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
                    }
                    else toast.error("Error to uploading item!", { id: loadingPromise })
                    closeAddNewItemModal()
                })
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
                setOverlayLoading(true)
                if (!Object.keys(addItemErrors).length) {
                    handleImageUpload(handleSubmit, values)
                }
            }
        })

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

    const ReqNewItemModal = () => {
        const [formValue, setFormValue] = useState({ name: '', description: '', req_item: '' })

        const handleChange = (value, name) => {
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            alert(JSON.stringify(formValue, null, 2))
            setFormValue({ name: '', description: '', req_item: '' })
            closeReqNewItemModal()
        }
        return (
            <Modal opened={openedReqNewItemModal} onClose={closeReqNewItemModal} title={<div className="title mt-6">Request new Item</div>}>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <Autocomplete
                        label="Name"
                        placeholder="Enter item name"
                        nothingFound="Nothing found"
                        name='name'
                        value={formValue.name}
                        onChange={(e) => handleChange(e, 'name')}
                        data={animals}
                        withAsterisk
                        required
                    // error={errors.email}
                    />
                    <TextInput
                        label="Description"
                        placeholder="Enter item description"
                        value={formValue.description}
                        name="description"
                        onChange={(e) => handleChange(e.target.value, 'description')}
                    // error={errors.email}
                    />
                    <NumberInput
                        min={0}
                        label="Request Quantity"
                        placeholder="Quantity of request item"
                        name="available"
                        value={formValue.req_item}
                        onChange={(e) => handleChange(e, 'req_item')}
                        withAsterisk
                        required
                    // error={errors.email}
                    />
                    <div className="flex items-center justify-center gap-4">
                        <Button type="submit" fullWidth>Submit</Button>
                        <Button onClick={closeReqNewItemModal} fullWidth variant="outline" color="red">Cancel</Button>
                    </div>
                </form>

            </Modal>
        )
    }

    const ActionModal = () => {
        const [formValue, setFormValue] = useState({ name: selectedItem.name, description: selectedItem.description, available: selectedItem.available, damaged: selectedItem.damaged, req_item: undefined })

        const handleChange = (value, name) => {
            // console.log({value, name})
            setFormValue((prev) => ({ ...prev, [name]: value }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            alert(JSON.stringify(formValue, null, 2))
            setFormValue({ name: '', description: '', available: '', damaged: '', req_item: null })
            closeActionModal()
        }
        return (
            <Modal opened={openedActionModal} onClose={closeActionModal} title={<div className="title mt-6">{selectedItem.title}</div>}>

                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
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
                    {selectedItem.id != 3 && <NumberInput
                        min={0}
                        label="Amount"
                        name="req_item"
                        placeholder='Amount of request items'
                        onChange={(e) => handleChange(e, 'req_item')}
                        withAsterisk
                        required
                        value={formValue.req_item}
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
                        <div className="space-x-2">
                            <Button
                                size="xs"
                                onClick={openReqNewItemModal}
                            >
                                Request for New Item
                            </Button>
                            <Button
                                size="xs"
                                onClick={openAddNewItemModal}
                                color="gray"
                            >
                                Add New Item
                            </Button>
                        </div>
                    </div>
                    <div className="flex">
                        <span className="text-gray-500 text-xs font-medium">Total {filterLists.length} items</span>
                    </div>
                </div>
                <table className="w-full m-0 min-w-[400px] rounded-md overflow-hidden text-sm text-left rtl:text-right text-gray-600">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-300">
                        <tr>
                            <th>SL NO.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Available</th>
                            <th>Damaged</th>
                            <th>Action</th>
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
                                                            setSelectedItem({ ...item, title: "Request for Restock", id: 1 })
                                                            openActionModal()
                                                        }}
                                                    >
                                                        Request For Restock
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        onClick={() => {
                                                            openActionModal()
                                                            setSelectedItem({ ...item, title: "Request for Repair", id: 2 })
                                                        }}
                                                    >
                                                        Request For Repair
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Item
                                                        color="blue"
                                                        onClick={() => {
                                                            openActionModal()
                                                            setSelectedItem({ ...item, title: "Edit", id: 3 })
                                                        }}
                                                    >
                                                        Edit Item
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        color="red"
                                                        onClick={() => {
                                                            alert("Item delted!")
                                                        }}
                                                    >
                                                        Delete Item
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <ActionModal />
            <ReqNewItemModal />
            <AddNewItemModal />
            <LoadingOverlay visible={overlayLoading} overlayProps={{ blur: 2 }} loader={<></>} />
        </div>
    );
}

export const animals = [
    { label: 'monkey', value: 'Monkey' },
    { label: 'snake', value: 'Snake' },
    { label: 'lion', value: 'Lion' },
    { label: 'tiger', value: 'Tiger' },
    { label: 'bird', value: 'Bird' },
    { label: 'fish', value: 'Fish' },
    { label: 'elephant', value: 'Elephant' },
    { label: 'cat', value: 'Cat' },
    { label: 'rabbit', value: 'Rabbit' }
]

