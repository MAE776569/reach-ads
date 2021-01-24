import React, { useState, useEffect } from "react"
import {
  Container,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  IconButton,
  Text,
  Flex,
  Button,
  Spacer,
  Center,
  useDisclosure,
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { deleteCategory, editCategory, getCategories } from "../utils/api"
import CategoryModal from "./CategoryModal"
import CategoryAlert from "./CategoryAlert"

const Categories = () => {
  const [categories, setCategories] = useState([])
  const {
    isOpen: openModal,
    onOpen: setOpenModal,
    onClose: setCloseModal,
  } = useDisclosure()
  const [editId, setEditId] = useState(null)
  const [openAlert, setOpenAlert] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [categoryToEdit, setEditCategory] = useState(null)

  const fetchCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenAlert = (id) => {
    setDeleteId(id)
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setDeleteId(null)
    setOpenAlert(false)
  }

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(deleteId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateCategory = async (category) => {
    try {
      const res = await editCategory(editId, category)
      return res
    } catch (error) {
      return (error.response && error.response.status) || 500
    }
  }

  const handleOpenEdit = (id, category) => {
    setEditId(id)
    setEditCategory(category)
    setOpenModal()
  }

  const handleCloseEdit = () => {
    setEditId(null)
    setEditCategory(null)
    setCloseModal()
  }

  useEffect(() => {
    fetchCategories()
  }, [openModal, openAlert])

  return (
    <>
      <Container pt={5} pb={5}>
        <Flex pt={5} pb={5}>
          <Text fontSize="xl">Categories</Text>
          <Spacer />
          <Button size="sm" onClick={setOpenModal}>
            Add
          </Button>
        </Flex>
        <Box borderWidth={1} borderRadius={8}>
          {categories.length !== 0 ? (
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th>title</Th>
                  <Th>description</Th>
                  <Th>actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.map((category) => (
                  <Tr key={category._id}>
                    <Td>{category.title}</Td>
                    <Td>{category.description}</Td>
                    <Td>
                      <ButtonGroup size="sm" isAttached variant="outline">
                        <IconButton
                          icon={<EditIcon />}
                          onClick={() => handleOpenEdit(category._id, category)}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          onClick={() => handleOpenAlert(category._id)}
                        />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Center p={5}>No Categories</Center>
          )}
        </Box>
      </Container>
      <CategoryModal
        isOpen={openModal}
        onClose={editId ? handleCloseEdit : setCloseModal}
        handleUpdateCategory={handleUpdateCategory}
        isEdit={Boolean(editId)}
        category={categoryToEdit}
      />
      <CategoryAlert
        isOpen={openAlert}
        onClose={handleCloseAlert}
        handleDeleteCategory={handleDeleteCategory}
      />
    </>
  )
}

export default Categories
