import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

export default function MultipleSelectDropdown({
  options,
  selected,
  nothingSelectedText = "Start selecting",
  onSelected,
}: {
  selected: any[];
  options: any[];
  nothingSelectedText: string;
  onSelected: (newValue: any[]) => void;
}) {
  const startingSelected = options.filter((option) =>
    selected.includes(option.key)
  );
  const [internallySelected, setInternallySelected] =
    useState(startingSelected);

  useEffect(() => {
    onSelected(internallySelected.map((column) => column.key));
  }, [internallySelected]);

  return (
    <div className="w-32 ">
      <Listbox
        value={internallySelected}
        onChange={setInternallySelected}
        multiple
      >
        <div className="relative mt-1 border rounded-md ">
          <Listbox.Button className=" cursor-pointer min-h-9 relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {/* {internallySelected.length
                ? internallySelected
                    .map((column) => column.label)
                    .join(", ")
                : nothingSelectedText} */}
              Columns
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="z-20 w-54
             absolute mt-1 max-h-60  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              {options.map((column, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-pointer  select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-amber-100 text-amber-900"
                        : "text-gray-900"
                    }`
                  }
                  value={column}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {column.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
