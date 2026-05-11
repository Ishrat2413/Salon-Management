import React from 'react';
import Image from 'next/image';

export function Rankings() {
  return (
    <div className="bg-brand-card rounded-xl shadow-sm border border-brand-border overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Weekly Performance Rankings</h2>
          <p className="text-sm text-gray-500 mt-1">Top stylists across all regional salon branches</p>
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded-md text-xs text-gray-600 font-medium">
          Current Week
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-white border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium tracking-wider" scope="col">Rank</th>
              <th className="px-6 py-4 font-medium tracking-wider" scope="col">Employee</th>
              <th className="px-6 py-4 font-medium tracking-wider" scope="col">Salon</th>
              <th className="px-6 py-4 font-medium tracking-wider" scope="col">Total Sales</th>
              <th className="px-6 py-4 font-medium tracking-wider text-right" scope="col">Bonus/Inc.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* Row 1 */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs font-bold">
                  🏆
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Image alt="Elena Rodriguez" width={32} height={32} className="w-8 h-8 rounded-full object-cover" src="/image/Elena.svg" />
                  <span className="font-medium text-gray-800">Elena Rodriguez</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">Uptown Hub</td>
              <td className="px-6 py-4 font-semibold text-gray-800">$4,850.00</td>
              <td className="px-6 py-4 text-right">
                <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-brand-greenSoft text-brand-greenText">+$450</span>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold">
                  2
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Image alt="Elena Rodriguez" width={32} height={32} className="w-8 h-8 rounded-full object-cover" src="/image/Elena.svg" />
                  <span className="font-medium text-gray-800">Sarah Jenkins</span>
                  <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-pink-600">YOU</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">Downtown Salon</td>
              <td className="px-6 py-4 font-semibold text-gray-800">$4,220.00</td>
              <td className="px-6 py-4 text-right">
                <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-brand-greenSoft text-brand-greenText">+$320</span>
              </td>
            </tr>
            {/* Row 3 */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                  3
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Image alt="Elena Rodriguez" width={32} height={32} className="w-8 h-8 rounded-full object-cover" src="/image/Elena.svg" />
                  <span className="font-medium text-gray-800">Marcus Chen</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">Eastside Boutique</td>
              <td className="px-6 py-4 font-semibold text-gray-800">$3,940.00</td>
              <td className="px-6 py-4 text-right">
                <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-brand-greenSoft text-brand-greenText">+$250</span>
              </td>
            </tr>
            {/* Row 4 */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="w-6 h-6 text-gray-400 flex items-center justify-center text-xs font-medium">
                  4
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Image alt="Elena Rodriguez" width={32} height={32} className="w-8 h-8 rounded-full object-cover" src="/image/Elena.svg" />
                  <span className="font-medium text-gray-800">Jessica Miller</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">Downtown Salon</td>
              <td className="px-6 py-4 font-semibold text-gray-800">$3,150.00</td>
              <td className="px-6 py-4 text-right">
                <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">+$0</span>
              </td>
            </tr>
            {/* Row 5 */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="w-6 h-6 text-gray-400 flex items-center justify-center text-xs font-medium">
                  5
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Image alt="Elena Rodriguez" width={32} height={32} className="w-8 h-8 rounded-full object-cover" src="/image/Elena.svg" />
                  <span className="font-medium text-gray-800">David Thorne</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-500">West End Plaza</td>
              <td className="px-6 py-4 font-semibold text-gray-800">$2,890.00</td>
              <td className="px-6 py-4 text-right">
                <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">+$0</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Footer Action */}
      <div className="p-4 border-t border-gray-100 text-center">
        <a className="text-sm font-semibold text-brand-pinkIcon hover:text-pink-700 inline-flex items-center space-x-1" href="#">
          <span>View Full Report</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
        </a>
      </div>
    </div>
  );
}
