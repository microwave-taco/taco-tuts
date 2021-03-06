import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService  } from '../../services/appointment.service';
import { FilterDatePipe } from './pipes/appointment.date-pipe';
import { ConfirmedStudentPipe } from './pipes/appointment.confirmedStudent-pipe';
import {  InputText, Button, DataList } from 'primeng/primeng';

@Component({
    selector: 'appointment',
    providers: [ AppointmentService ],
    directives: [InputText, Button, DataList ],
    pipes: [ FilterDatePipe, ConfirmedStudentPipe ],
    template: require('./appointment.component.html'),
    styles: [`
    .appointments {
      font-family: 'Roboto', sans-serif;
      color: #33495f;
    }
    button {
      color: #33495f;
    }
    button:hover {
      color: #ff9f4f;
      background-color: white;
      cursor: pointer;
    }
     label {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;
    }
    `]
})    

export class AppointmentComponent {
    private subjects = [];
    private teachers = [];
    private teacherid: number;
    private studentid: Number; 
    private apptModel = {};
    private apptFormOpen: boolean = false; 
    private appointments = [];
    private inputDate: string;
    private filter: boolean = false;
    private apptListOpen: boolean = false;
    private rate: number;
    private apptCost: any;
    private times = [{label: "15 Minutes", time: 15}, 
                        {label: "30 Minutes", time: 30},
                        {label: "45 Minutes", time: 45},
                        {label: "60 Minutes", time: 60},]
                    

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private appointmentService: AppointmentService) {}


     ngOnInit() {
        this.getStudentID();
        this.getSubjects();
    };

    
    getSubjects() {
        this.appointmentService.getSubjects()
            .subscribe(
                data => this.subjects = data
            )
    }


    filterTeachers(subjectid) {
        this.appointmentService.filterTeachers(subjectid)
            .subscribe(
                data => {console.log("filterTeachers", data)
                    this.teachers = data
                }
            )
        console.log(subjectid); 
    }
    
    getRate(target){
       console.log("target", target)
       this.teacherid = target;
       this.rate = (this.teachers.filter(teacher =>  teacher.userid == this.teacherid))[0].rate;  
    }          
    
    getApptCost(time){
        this.apptCost = Number((time / 60) * this.rate).toFixed(2);
    }


    addAppointment(apptModel) {
        apptModel.apptCost = this.apptCost * 100
        apptModel.paid = false;
        apptModel.confirmed = false;
        apptModel.studentid = this.studentid;
        apptModel.datetime = apptModel.date + ' ' + apptModel.time
        console.log("appt Model from add appointment", apptModel)
        this.appointmentService.addAppointment(apptModel)
            .subscribe(data => {
                console.log("heres the data", data)
                this.getAppointments()  
            })
    }

    removeAppt(sessionid){
        console.log("appt remove", sessionid);
        this.appointmentService.removeAppt(sessionid)
            .subscribe(
                data => { console.log(data)
                        this.getAppointments()
                }
            )
    } 


    getAppointments(){
        console.log("get appointments called with student id", this.studentid)
        this.appointmentService.getAppointmentsByStudent(this.studentid)
            .subscribe(data => this.appointments = data);
    }
    

     getStudentID(){
        let authID = this.ngRedux.getState().login['userData'].authid;
        this.appointmentService.getUserID(authID)
            .subscribe( data => this.studentid = data[0].id);
    }    
    

}

