import React from "react";
import FilteredTableContainer from "../components/FilteredTableContainer";
import { tableData2 } from "../datasets";


const ProductTable = () => {
  const { title, Entity, actualData } = tableData2[0];
  const cards = [
   
    {
      title: tableData2[0].title,
      count: tableData2[0].actualData.length,
      icon: (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
        </span>
      ),
    },
   
  ];

  return (
   <div className="page-content">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, idx) => (
          <div key={idx} className="flex items-center bg-white rounded-xl shadow p-6 gap-4">
            {card.icon}
            <div>
              <div className="text-lg font-semibold text-gray-700">{card.title}</div>
              <div className="text-2xl font-bold text-gray-900">{card.count}</div>
              <div className="text-xs text-gray-400 mt-1">Total Data</div>
            </div>
          </div>
        ))}
      </div>

      <FilteredTableContainer
        title={title}
        entity={Entity}
        actualData={actualData}
      />
    </div>
  )
}

export default  ProductTable