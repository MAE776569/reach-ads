import React, { useState, useEffect } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react"
import { createCategory } from "../utils/api"

function CategoryModal({
  isOpen,
  onClose,
  handleUpdateCategory,
  isEdit,
  category,
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async () => {
    try {
      let res
      if (isEdit) res = await handleUpdateCategory({ title, description })
      else res = await createCategory({ title, description })
      if (res.status === 200 || res.status === 201) {
        setTitle("")
        setDescription("")
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (category) {
      const { title, description } = category
      setTitle(title)
      setDescription(description)
    }
  }, [category])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CategoryModal
