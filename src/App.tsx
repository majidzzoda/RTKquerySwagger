import { useState } from "react";
import { useAddDataMutation, useDeleteDataMutation, useDeleteImageMutation, useEditDataMutation, useEditDataStatusMutation, useGetDataQuery } from "./api/todoApi"
import { addIcon, checkStatus, deleteUserIcon, editIcon, searchIcon } from "./store/storeIcon";
import DrawerComponent from "./store/drawer";

export const App = () => {
  const { data, refetch, isLoading } = useGetDataQuery();
  const [editFunc] = useEditDataMutation();
  const [fileSelected, setFileSelected] = useState(false);
  const [deleteFunc] = useDeleteDataMutation();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [search, setSearch] = useState("");
  const [editStatusFunc] = useEditDataStatusMutation();
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [idX, setIdX] = useState(null);
  const [addFunc] = useAddDataMutation();
  const filteredData = data?.data.filter((e) => e.name.toLowerCase().trim().includes(search.toLowerCase().trim()))
  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("Name", e.target["name"].value)
    formData.append("Description", e.target["desc"].value)
    if (e.target["images"].files.length > 0) {
      formData.append("Images", e.target["images"].files[0])
    }
    addFunc(formData).then(() => setAddModal(false));
    e.target.reset();
  }

  function handleEdit(e) {
    setEditModal(true)
    setIdX(e.id);
    setEditName(e.name)
    setEditDescription(e.description)
  }

  function handleEditSave(e) {
    e.preventDefault()
    const editedTodo = {
      id: idX,
      name: e.target['name'].value,
      description: e.target['desc'].value
    }
    editFunc(editedTodo)
    setEditModal(false)
  }
  function editStatus(e) {
    editStatusFunc({ id: e.id, isCompleted: !e.isCompleted }).then(() => refetch());
  }
  if (isLoading) return <h1 className="text-center font-bold text-[30px] text-blue-500 mt-[400px]">Loading...</h1>;
  return (
    <div className="lg:px-[0px] px-[20px]">
      {addModal && (
        <div className="flex fixed z-50 inset-0 items-center justify-center backdrop-blur-2xl">
          <form className="lg:w-[35%] p-[25px] flex flex-col gap-[10px] rounded-[12px] bg-gray-950/50 m-auto" onSubmit={handleSubmit}>
            <h1 className="text-center mb-[20px] font-bold text-blue-500">Add Modal</h1>
            <input className="bg-gray-900/70 py-[5px] w-full placeholder:text-gray-700 px-[10px] rounded-[5px] cursor-pointer border border-gray-900 focus:border focus:border-blue-500 transition-all duration-500 outline-none" type="text" placeholder="Name" name="name" />
            <input className="bg-gray-900/70 py-[5px] w-full placeholder:text-gray-700 px-[10px] rounded-[5px] cursor-pointer border border-gray-900 focus:border focus:border-blue-500 transition-all duration-500 outline-none" type="text" placeholder="Description" name="desc" />
            <label htmlFor="images" className="bg-gray-900/70 py-[5px] w-full px-[10px] rounded-[5px] cursor-pointer border border-gray-900 focus:border focus:border-blue-500 transition-all duration-500 outline-none">
              <h1 className="text-gray-700">Image</h1>
              <input id="images" className="hidden" type="file" placeholder="Images" name="images" />
            </label>
            <div className="flex items-center gap-[10px] w-full mt-[20px]">
              <button className="bg-red-500/70 hover:opacity-50 transition-all duration-300 w-full py-[5px] px-[10px] rounded-[5px] cursor-pointer text-white" onClick={() => setAddModal(false)}>Cancel</button>
              <button className="bg-blue-500/70 hover:opacity-50 transition-all duration-300 w-full py-[5px] px-[10px] rounded-[5px] cursor-pointer text-white" type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
      {editModal && (
        <div className="flex fixed z-50 inset-0 items-center justify-center backdrop-blur-2xl">
          <form className="lg:w-[35%] p-[25px] flex flex-col gap-[10px] rounded-[12px] bg-gray-950/40 m-auto" onSubmit={handleEditSave}>
            <h1 className="text-center mb-[20px] font-bold text-blue-500">Edit Modal</h1>
            <input value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-gray-900/70 py-[5px] w-full placeholder:text-gray-700 px-[10px] rounded-[5px] cursor-pointer border border-gray-900 focus:border focus:border-blue-500 transition-all duration-500 outline-none" type="text" placeholder="Name" name="name" />
            <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="bg-gray-900/70 py-[5px] w-full placeholder:text-gray-700 px-[10px] rounded-[5px] cursor-pointer border border-gray-900 focus:border focus:border-blue-500 transition-all duration-500 outline-none" type="text" placeholder="Description" name="desc" />
            <div className="flex items-center gap-[10px] w-full mt-[20px]">
              <button className="bg-red-500/70 hover:opacity-50 transition-all duration-300 w-full py-[5px] px-[10px] rounded-[5px] cursor-pointer text-white" onClick={() => setEditModal(false)}>Cancel</button>
              <button className="bg-blue-500/70 hover:opacity-50 transition-all duration-300 w-full py-[5px] px-[10px] rounded-[5px] cursor-pointer text-white" type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
      <div className="lg:w-[50%] m-auto mt-[40px] p-[30px] flex flex-col gap-[20px] rounded-[12px]  bg-gray-900">
        <span className="w-[10px]" onClick={() => setAddModal(true)}>{addIcon}</span>
        <h1 className="text-center font-bold text-blue-500 text-[30px]">Users: {filteredData.length}</h1>
        <div className="flex items-center">
          <span className="absolute px-[15px]">{searchIcon}</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-950/50 focus:bg-gray-950 w-full py-[15px] px-[50px] rounded-[12px] cursor-pointer border border-gray-900 focus:border focus:border-blue-500 transition-all duration-500 outline-none" type="text" placeholder="Search" />
        </div>
        <div className="bg-gray-900 w-full m-auto flex flex-col h-[320px] lg:h-[480px] overflow-scroll rounded-[12px] gap-[15px]">
          {data?.data
            .filter((e) => e.name.toLowerCase().trim().includes(search.toLowerCase().trim()))
            .map((e) => {
              return (
                <div className="w-full bg-gray-950 p-[20px] flex rounded-[12px] gap-[17px] flex-col justify-center" key={e.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="max-w-[200px] text-blue-500 font-bold text-[20px] break-words">{e.name}</h1>
                      <b className={e.isCompleted ? 'text-green-500' : 'text-red-500'}>{e.isCompleted ? "Active" : "Inactive"}</b>
                    </div>
                  </div>
                  <div className="flex w-full justify-around items-center">
                    <button onClick={() => editStatus(e)}>{checkStatus}</button>
                    <button onClick={() => deleteFunc(e.id).then(() => refetch())}>{deleteUserIcon}</button>
                    <button>
                      <DrawerComponent id={e.id}  >
                      </DrawerComponent>
                    </button>
                    <button onClick={() => handleEdit(e)}>{editIcon}</button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
