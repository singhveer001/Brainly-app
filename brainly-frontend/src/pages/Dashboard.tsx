import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents} = useContent();
  const [selectedType, setSelectedType] = useState<any>("all");
  
  const filteredContents = contents.filter( content =>
            selectedType === "all" || content.type?.toLowerCase().trim() === selectedType.toLowerCase().trim()
    );

  return <div >
      <Sidebar setSelectedType={setSelectedType}  />
      <div className='p-4 ml-72 min-h-screen bg-gray-200 border-2'>
        <CreateContentModal open={modalOpen} onClose={() => {
            setModalOpen(false)
        }} />
        <div className='flex justify-end gap-4 mb-2'>
          <Button onClick={ () => {
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
                    type={type} 
                    link={link} 
                    title={title} 
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
