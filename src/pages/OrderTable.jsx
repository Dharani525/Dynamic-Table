import React from "react";
import FilteredTableContainer from "../components/FilteredTableContainer";
import { tableData3 } from "../datasets";


const OrderTable = () => {
  const { title, Entity, actualData } = tableData3[0];
  const cards = [
    
    {
      title: tableData3[0].title,
      count: tableData3[0].actualData.length,
      icon: (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2M9 17H7a2 2 0 01-2-2v-2a2 2 0 012-2h2m0 0V7a4 4 0 014-4h0a4 4 0 014 4v2" /></svg>
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

export default  OrderTable