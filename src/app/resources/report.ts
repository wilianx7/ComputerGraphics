import { ReportTypeEnum } from './report-type.enum';

export class Report {
    public id: number;
    public type: ReportTypeEnum;
    public distance: string;
    public time: string;
    public position: string;
    public airplanes: string;
}
