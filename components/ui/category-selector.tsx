"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

interface CategorySelectorProps {
      categories: Category[];
}
export default function CategorySelectorComponent({ categories }: CategorySelectorProps) {
      const [open, setOpen] = useState(false);
      const router = useRouter();
      const [value, setValue] = useState<string>("");

      return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                  <Button variant={"outline"}
                        role="combobox"
                        aria-expanded={open}
                        className="w-full max-w-full relative flex justify-center
                   sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hove:bg-blue-700 text-white font-bold py-2 px-4 rounded
                   hover:cursor-pointer"
                  >
                        {
                              value ? categories.find((category) => category._id === value)?.title : "Filter by category"
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                  </Button>
                  
            </PopoverTrigger>
            
            <PopoverContent>
                  <Command>
                        <CommandInput
                              placeholder="Search category ..."
                              className="h-9"
                              onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                          const selectedCategory = categories.find((c) => c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()));
                                          if (selectedCategory?.slug?.current) {
                                                setValue(selectedCategory._id);
                                                router.push(`/categories/${selectedCategory.slug.current}`);
                                          }
                                    }
                              }}
                        />
                        <CommandList>
                              <CommandEmpty>No categories found</CommandEmpty>
                              <CommandGroup>
                                    {
                                          categories.map((category) => (
                                                <CommandItem
                                                      key={category._id}
                                                      value={category.title}
                                                      onSelect={() => {
                                                            setValue(value === category._id ? "" : category._id);
                                                            router.push(`/categories/${category.slug?.current}`);
                                                            setOpen(false)
                                                      }}
                                                >
                                                      {category.title}
                                                      <Check
                                                            className={cn(
                                                                  "ml-auto h-4 w-4",
                                                                  value === category._id ? "opacity-100" : "opacity-0" 
                                                            )}
                                                      />
                                                </CommandItem>
                                          ))
                                    }
                              </CommandGroup>
                        </CommandList>
                  </Command>
            </PopoverContent>
      </Popover>
      )
}