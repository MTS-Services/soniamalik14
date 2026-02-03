import React from 'react';
import Card from '../../../../components/ui/Card';

const SectionBox = ({ title, children }) => (
  <div className="mb-4">
    <div className="text-sm font-medium mb-2">{title}</div>
    <div className="bg-white border border-gray-200 rounded-md p-3">{children}</div>
  </div>
);

const EventFilters = () => {
  return (
    <div className="space-y-4">
      <Card className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Filters</div>
          {/* <div className="text-btn-primary">☰</div> */}
        </div>
        <input placeholder="Search by city/area" className="w-full bg-gray-100 rounded-md p-2 text-sm" />
      </Card>

      <SectionBox title="Event Type">
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" /> Match</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Tournament</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Trial</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Training</label>
        </div>
      </SectionBox>

      <SectionBox title="Date">
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" /> Upcoming</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> This Week</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> This Month</label>
        </div>
      </SectionBox>

      <SectionBox title="Organizer">
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" /> Club</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Community</label>
        </div>
      </SectionBox>

      <SectionBox title="Skill Level">
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" /> Beginner</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Intermediate</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Advanced</label>
        </div>
      </SectionBox>
    </div>
  );
};

export default EventFilters;
