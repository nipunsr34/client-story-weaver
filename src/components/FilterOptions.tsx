
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface FilterOptionsProps {
  filters: {
    timeframe: string;
    population: string;
    specificMetric: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterOptions = ({ filters, onFiltersChange }: FilterOptionsProps) => {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters (Optional)
        </CardTitle>
        <CardDescription>
          Refine your analysis scope
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="timeframe">Time Period</Label>
          <Select 
            value={filters.timeframe} 
            onValueChange={(value) => updateFilter('timeframe', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="population">Population</Label>
          <Select 
            value={filters.population} 
            onValueChange={(value) => updateFilter('population', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-members">All Members</SelectItem>
              <SelectItem value="diabetics">Diabetics Only</SelectItem>
              <SelectItem value="age-65-plus">Age 65+</SelectItem>
              <SelectItem value="mapd-only">MAPD Only</SelectItem>
              <SelectItem value="high-utilizers">High Utilizers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specific-metric">Specific Metric (Optional)</Label>
          <Input 
            id="specific-metric"
            placeholder="e.g., PDC < 80%, No screening in 12m"
            value={filters.specificMetric}
            onChange={(e) => updateFilter('specificMetric', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
