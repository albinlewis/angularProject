import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

    searchedplant: string = '';
    allplants = [{
        name: 'List1',
        description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
        'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
        ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
        'inventu qui descendant. Quamquam Ennius recte.'
    }
        , {
            name: 'List2',
            description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
            'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
            ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
            'inventu qui descendant. Quamquam Ennius recte.'
        }
        , {
            name: 'List Item Heading 1',
            description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
            'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
            ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
            'inventu qui descendant. Quamquam Ennius recte.'
        }
        , {
            name: 'List Item Heading 1',
            description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
            'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
            ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
            'inventu qui descendant. Quamquam Ennius recte.'
        }
        , {
            name: 'List Item Heading 1',
            description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
            'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
            ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
            'inventu qui descendant. Quamquam Ennius recte.'
        }
        , {
            name: 'List Item Heading 1',
            description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
            'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
            ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
            'inventu qui descendant. Quamquam Ennius recte.'
        }
        , {
            name: 'List Item Heading 1',
            description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
            'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
            ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
            'inventu qui descendant. Quamquam Ennius recte.'
        }
        , {
            name: 'List Item Heading 1',
            description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
            'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
            ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
            'inventu qui descendant. Quamquam Ennius recte.'
        }
        , {
            name: 'List Item Heading 1',
            description: 'taque verae amicitiae difficillime reperiuntur in iis qui in honoribus ' +
            'reque publica versantur; ubi enim istum invenias qui honorem amici anteponat suo? Quid? Haec ut' +
            ' omittam, quam graves, quam difficiles plerisque videntur calamitatum societates! Ad quas non est facile ' +
            'inventu qui descendant. Quamquam Ennius recte.'
        }

    ];


    constructor(private route: Router) {

    }

    ngOnInit() {
    }

    Onshowdetails() {
        this.route.navigate(['/details']);

    }

}
