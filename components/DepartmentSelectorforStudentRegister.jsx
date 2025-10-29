"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const department = [
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Computer Science and Engineering", label: "Computer Science and Engineering" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Electronics and Communication Engineering", label: "Electronics and Communication Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Aerospace Engineering", label: "Aerospace Engineering" },
  { value: "Automobile Engineering", label: "Automobile Engineering" },
  { value: "Biomedical Engineering", label: "Biomedical Engineering" },
  { value: "Metallurgical and Materials Engineering", label: "Metallurgical and Materials Engineering" },
  { value: "Instrumentation Engineering", label: "Instrumentation Engineering" },
  { value: "Biotechnology Engineering", label: "Biotechnology Engineering" },
];

export function DepartmentSelectorforStudentRegister({getDepartmentValue,settheme,initialDepartment}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
React.useEffect(() => {
  getDepartmentValue(value)
}, [value])
React.useEffect(() => {
  if(initialDepartment){
    setValue(initialDepartment)
  }
}, [initialDepartment])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
     <Button
  variant="outline"
  role="combobox"
  aria-expanded={open}
  className={cn(
    "w-[250px] justify-between overflow-hidden text-foreground bg-card border-border hover:bg-accent hover:text-accent-foreground"
  )}
>

          {/* ${settheme ? 'light':'dark'} */}
          {value
            ? department.find((framework) => framework.value === value)?.label
            : "Select Department..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
   <PopoverContent
  className="w-[250px] p-0 bg-popover text-popover-foreground border border-border shadow-md"
>

        <Command>
        <CommandInput
  placeholder="Search Department..."
  className="h-9 bg-input text-foreground border-border pl-3 placeholder:text-muted-foreground"
/>

          <CommandList>
            <CommandEmpty>No Department Found.</CommandEmpty>
            <CommandGroup>
              {department.map((framework) => (
              <CommandItem
  key={framework.value}
  value={framework.value}
  onSelect={(currentValue) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
  }}
  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
>
  {framework.label}
  <Check
    className={cn(
      "ml-auto transition-opacity",
      value === framework.value ? "opacity-100 text-primary" : "opacity-0"
    )}
  />
</CommandItem>

              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
