import React from 'react'
import Button from '../../../components/ui/Button'

const ImageCreate = () => {
  return ( 
      <section className="">
        <h2 className="text-xl font-semibold mb-2">Gallery / Image Editor</h2>
        <input type="file" multiple className="block w-full mb-2" />
        <Button variant="gray">Reorder Images</Button>
        <Button variant="green">Set Default Image</Button>
        <input
          placeholder="Video Demo URL (YouTube, Vimeo)"
          className="block w-full mb-2 p-2 border rounded"
        />
        <Button variant="black">Compress & Optimize</Button>
      </section>
  )
}

export default ImageCreate