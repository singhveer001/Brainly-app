import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents} = useContent();
  const [selectedType, setSelectedType] = useState<any>("all");
  const [editContent, setEditContent] = useState<any>(null);
  const [localContents, setLocalContents] = useState(contents);

  useEffect(() => {
    setLocalContents(contents)
  },[contents])

  const filteredContents = localContents.filter( content =>
            selectedType === "all" || content.type?.toLowerCase().trim() === selectedType.toLowerCase().trim()
    );
  
  const handleEdit = (_id: string, title: string, link: string, type:"youtube" | "twitter") => {
    setEditContent({_id, title, link, type});
    setModalOpen(true);
  }

  const handleDelete = async (id:string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this content?")
    if(!confirmDelete) return ;
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`,{
        data: {
          contentId : id
        },
        headers : {
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      })
      //@ts-ignore
      setLocalContents(prev => prev.filter(c => c._id !== id))
    } catch (error) {
      console.log("Failed to delete content",error)
      alert("Error deleting content")
    }
  }

  return <div >
      <Sidebar setSelectedType={setSelectedType}  />
      <div className='p-4 ml-72 min-h-screen bg-gray-200 border-2'>
        <CreateContentModal 
          open={modalOpen} 
          onClose={() => {
            setModalOpen(false)
            setEditContent(null);
          }}
          initialData={editContent}
        />
        <div className='flex justify-end gap-4 mb-2'>
          <Button onClick={ () => {
            setEditContent(null)
            setModalOpen(true)
          }} variant='primary' text="Add Content" startIcon={<PlusIcon/>}></Button>
          <Button onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                    share : true
                }, {
                    headers : {
                        "Authorization" :  `Bearer ${localStorage.getItem("token")}`
                    }
                }) 
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                await navigator.clipboard.writeText(shareUrl); 
                alert("Link copied to clipboard!");
          }} variant='secondary' text="Share brain" startIcon={<ShareIcon/>}></Button>
        </div>
        <div className='flex gap-4 flex-wrap'>
           { filteredContents.length  > 0 ? filteredContents.map(({ type, link, title, _id }) => <Card 
                    key={_id}
                    _id= {_id}
                    type={type} 
                    link={link} 
                    title={title} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />) : 
                (
                  <p className='text-gray-600'>No Content Available</p>
                )
            }
          {/* <Card type="youtube" link="https://www.youtube.com/watch?v=ngd1t84gk48" title="Future"/> */}
        </div>
      </div>
  </div>
}
