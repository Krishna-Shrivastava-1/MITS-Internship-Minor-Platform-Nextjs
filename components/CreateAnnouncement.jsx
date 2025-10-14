'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { BellPlus, Pencil } from "lucide-react";

const CreateAnnouncement = () => {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [embeddedLink, setEmbeddedLink] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [expiryTime, setExpiryTime] = useState("");
    const [active, setactive] = useState(false)
    const [editcontent, seteditContent] = useState("");
    const [editdescription, seteditDescription] = useState("");
    const [editembeddedLink, seteditEmbeddedLink] = useState("");
    const [editexpiryDate, seteditExpiryDate] = useState("");
    const [editexpiryTime, seteditExpiryTime] = useState("");
    const [editactive, seteditactive] = useState(false)
    const [dialogueOpen, setdialogueOpen] = useState(false)
    const [announcementData, setannouncementData] = useState([])
  

    const fetchAnnouncement = async () => {
        try {
            const resp = await axios.get('/api/announcement/getannouncementforsuperadmin')
            if (resp?.data?.success) {
                console.log(resp?.data?.getAnnouncement)
                setannouncementData(resp?.data?.getAnnouncement)
            }
        } catch (error) {
            console.log(error?.message)
        }
    }
    
const handleSubmit = async (e) => {
  e.preventDefault();
  const expiresAt = new Date(`${expiryDate}T${expiryTime}`);

  const resp = await axios.post("/api/announcement/createannouncement", {
    content,
    description,
    embeddedLink,
    expiresAt,
    active
  });

  if (resp?.data?.success) {
    toast.success("Announcement created successfully");
                setContent('')
            setDescription('')
            setEmbeddedLink('')
            setExpiryDate('')
            setactive(false)
            setExpiryTime('')
            fetchAnnouncement()
            setOpen(false)
  
  } else {
    toast.error(resp?.data?.message || "Error creating announcement");
  }
};

    useEffect(() => {
        fetchAnnouncement()
    }, [])

    // console.log(editcontent)
    // console.log(expiryDate)
    // console.log(expiryTime)
    // console.log(announcementData)
const openDialog = (item) => {
  const d = new Date(item?.expiresAt);
  seteditExpiryDate(d.toLocaleDateString("en-CA")); // "YYYY-MM-DD"
  seteditExpiryTime(d.toLocaleTimeString("en-GB", { hour12: false }).slice(0, 5)); // "HH:MM"
  seteditContent(item?.content || "");
  seteditDescription(item?.description || "");
  seteditactive(item?.active || false);
  seteditEmbeddedLink(item?.embeddedLink || "");
  setdialogueOpen(true);
};



const handleUpdate = async (id) => {
  try {
    const expiresAt = new Date(`${editexpiryDate}T${editexpiryTime}:00`);
    // console.log(expiresAt)
    const resp = await axios.put(`/api/announcement/editannouncement/${id}`, {
      content: editcontent,
      description: editdescription,
      embeddedLink: editembeddedLink,
      expiresAt,
      active: editactive,
    });

    if (resp?.data?.success) {
      toast.success("Announcement updated successfully");
      setdialogueOpen(false);
      fetchAnnouncement();
    } else {
      toast.error(resp?.data?.message || "Update failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while updating");
  }
};

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger ><div className="flex items-center bg-blue-700 cursor-pointer select-none hover:bg-blue-600 font-semibold text-white p-1 px-3 text-sm rounded-full gap-x-1.5 "><BellPlus /> Add New Announcement</div></DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Add Announcement</DialogTitle>
                        <form onSubmit={handleSubmit} className=" w-full mx-auto space-y-3">
                            <h3 className="font-semibold ">Main Annoucement Heading</h3>
                            <Input
                                type="text"
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="border p-2 w-full"
                                required
                            />
                            <h3 className="font-semibold ">Description about Announcement</h3>
                            <Textarea
                                placeholder="Description (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border p-2 w-full max-h-[200px] whitespace-pre-wrap"
                            />
                            <h3 className="font-semibold ">Link to Embbed</h3>
                            <input
                                type="text"
                                placeholder="Embedded Link (optional)"
                                value={embeddedLink}
                                onChange={(e) => setEmbeddedLink(e.target.value)}
                                className="border p-2 w-full"
                            />

                            {/* Expiry fields */}
                            <h3 className="font-semibold ">Expiry Date and Time</h3>
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className="border p-2 w-1/2"
                                    required
                                />
                                <input
                                    type="time"
                                    value={expiryTime}
                                    onChange={(e) => setExpiryTime(e.target.value)}
                                    className="border p-2 w-1/2"
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2 cursor-pointer select-none">
                                <Switch
                                    checked={active}
                                    onCheckedChange={(val) => setactive(val)}
                                    id="active-toggle"
                                />
                                <Label htmlFor="active-toggle">Active to Public</Label>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Create Announcement
                            </button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className="w-full overflow-x-auto border p-2 px-5">
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Sr.</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead className="">Content</TableHead>
                            <TableHead className="">Description</TableHead>
                            <TableHead className="">Embedded Link</TableHead>
                            <TableHead className="">ExpiresAt Date</TableHead>
                            <TableHead className="">ExpiresAt Time</TableHead>
                            <TableHead className="">CreatedAt Date</TableHead>
                            <TableHead className="">CreatedAt Time</TableHead>
                            <TableHead className="">Edit</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            announcementData?.map((e, index) => (
                                <TableRow key={e?._id}>
                                    <TableCell>{index + 1}.</TableCell>
                                    <TableCell>
                                        {e?.active ? 'Active' : 'Not Active'}
                                    </TableCell>

                                    <TableCell>{e?.content}</TableCell>
                                    <TableCell>{e?.description}</TableCell>
                                    <TableCell>{e?.embeddedLink}</TableCell>
                                    <TableCell>{new Date(e?.expiresAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(e?.expiresAt).toLocaleTimeString()}</TableCell>
                                    <TableCell>{new Date(e?.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(e?.createdAt).toLocaleTimeString()}</TableCell>
                                    <TableCell>
                                        <span
                                            onClick={() => openDialog(e)}
                                            
                                        >
                                            <Pencil className="size-8 bg-neutral-950 rounded-md cursor-pointer select-none text-white  hover:bg-neutral-900 p-2"/>
                                        </span>

                                       {dialogueOpen && (
  <div
    onClick={() => setdialogueOpen(false)}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-[90%] max-w-md border border-neutral-200 dark:border-neutral-800"
    >
      <h2 className="text-lg font-semibold mb-3">Edit Announcement</h2>

      <div className="w-full mx-auto space-y-3">
        <h3 className="font-semibold">Main Announcement Heading</h3>
        <Input
          type="text"
          placeholder="Content"
          value={editcontent}
          onChange={(e) => seteditContent(e.target.value)}
          required
        />

        <h3 className="font-semibold">Description about Announcement</h3>
        <Textarea
        className="border p-2 w-full max-h-[200px] whitespace-pre-wrap"
          placeholder="Description (optional)"
          value={editdescription}
          onChange={(e) => seteditDescription(e.target.value)}
        />

        <h3 className="font-semibold">Link to Embed</h3>
        <Input
          type="text"
          placeholder="Embedded Link (optional)"
          value={editembeddedLink}
          onChange={(e) => seteditEmbeddedLink(e.target.value)}
        />

        <h3 className="font-semibold">Expiry Date and Time</h3>
        <div className="flex gap-2">
          <input
            type="date"
            value={editexpiryDate}
            onChange={(e) => seteditExpiryDate(e.target.value)}
            className="border p-2 w-1/2"
            required
          />
          <input
            type="time"
            value={editexpiryTime}
            onChange={(e) => seteditExpiryTime(e.target.value)}
            className="border p-2 w-1/2"
            required
          />
        </div>

        <div className="flex items-center space-x-2 cursor-pointer select-none">
          <Switch
            checked={editactive}
            onCheckedChange={(val) => seteditactive(val)}
            id="active-toggle"
          />
          <Label htmlFor="active-toggle">Active to Public</Label>
        </div>

        <Button
          onClick={() => handleUpdate(e?._id)}
          className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Update Announcement
        </Button>
      </div>
    </div>
  </div>
)}

                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </div>
        </div>

    );
};

export default CreateAnnouncement;
