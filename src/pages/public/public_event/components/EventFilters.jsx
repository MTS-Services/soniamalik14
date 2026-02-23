import React from 'react';
import Card from '../../../../components/ui/Card';
import { Filter } from 'lucide-react';

const SectionBox = ({ title, children }) => (
  <div className="mb-4">
    <div className="text-base font-medium mb-2">{title}</div>
    <div className="bg-white border border-[#B5D5D2] rounded-md p-3">{children}</div>
  </div>
);

const EventFilters = ({ filters = {}, onChange = () => { } }) => {
  const update = (patch) => onChange({ ...filters, ...patch });

  const toggleType = (type) => {
    const set = new Set(filters.eventTypes || []);
    if (set.has(type)) set.delete(type); else set.add(type);
    update({ eventTypes: Array.from(set) });
  };

  const toggleDate = (d) => {
    const set = new Set(filters.date || []);
    if (set.has(d)) set.delete(d); else set.add(d);
    update({ date: Array.from(set) });
  };

  return (
    <div className="space-y-4">
      <Card className="p-3" style={{ borderColor: '#B5D5D2' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Filters</div>

        </div>
        <label className='pb2 mb-2 block text-base font-medium text-[#1D1D1D]'>
          City/Area
        </label>
        <input
          value={filters.city || ''}
          onChange={(e) => update({ city: e.target.value })}
          placeholder="Search by city/area"
          className="w-full bg-gray-100 rounded-md p-2 text-base"
        />
      </Card>

      <SectionBox title="Event Type">
        <div className="space-y-2 text-base">
          {[
            'All events',
            'Workshops & learning',
            'Wellbeing & support',
            'Tournaments & competitions',
            'Community & campaigns',
          ].map((t) => (
            <label key={t} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(filters.eventTypes || []).includes(t)}
                onChange={() => toggleType(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </SectionBox>

      <SectionBox title="Date">
        <div className="space-y-2 text-base">
          {['Upcoming', 'This Week', 'This Month'].map((d) => (
            <label key={d} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(filters.date || []).includes(d)}
                onChange={() => toggleDate(d)}
              />
              {d}
            </label>
          ))}
        </div>
      </SectionBox>

      <SectionBox title="Sport (optional)">
        <div className="text-base">
          <select
            value={filters.sport || ''}
            onChange={(e) => update({ sport: e.target.value })}
            className="w-full bg-gray-100 rounded-md p-2 text-base"
          >
            <option value="">All sports</option>
            <option value="football">Football</option>
            <option value="netball">Netball</option>
            <option value="squash">Squash</option>
            <option value="padel">Padel</option>
            <option value="cricket">Cricket</option>
            <option value="multi">Multi-sport</option>
          </select>
        </div>
      </SectionBox>

      {/* <SectionBox title="Organizer">
        <div className="space-y-2 text-base">
          <label className="flex items-center gap-2"><input type="checkbox" /> Club</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Community</label>
        </div>
      </SectionBox>

      <SectionBox title="Skill Level">
        <div className="space-y-2 text-base">
          <label className="flex items-center gap-2"><input type="checkbox" /> Beginner</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Intermediate</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Advanced</label>
        </div>
      </SectionBox> */}
    </div>
  );
};

export default EventFilters;
