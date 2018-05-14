import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {BrowseService} from '../services/browse.service';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

    searchedplant = '';
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


    constructor(private route: Router, private browservice: BrowseService) {
         console.log('plants component created');
    }

    ngOnInit() {
    }

    Onshowdetails(plants) {
        this.route.navigate(['/details']);
        this.browservice.plantselect = plants;


    }

}
