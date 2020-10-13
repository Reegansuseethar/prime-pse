import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})

export class IntroComponent implements OnInit {

  subGrouplist: any;
  grp_id: any;

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public random_bg_color() {
    var letters = '0123456789ABCDEF';
    var color: any = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return {
      'background': color
    }
  }

  constructor(private service: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.grp_id = params.id;
      this.service.getSubGroupByGroupId(params.id).subscribe((res: any) => {
        // console.log(res)
        this.subGrouplist = res;
      })
    })
  }

  mockTest() {
    this.router.navigate(['question'], { queryParams: { 'id': this.grp_id } })
  }

  goToLink(url: any) {
    if (url) {
      window.open(url);
    }
  }

  studyNotes(doc: any, group: any) {
    if (doc) {
      this.b64toBlob(doc, group);
    }
  }

  b64toBlob(dataURI: any, group: any) {
    let byteString = atob(dataURI.split(',')[1]);
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    let blob = new Blob([ab], { type: 'application/pdf' });
    FileSaver.saveAs(blob, group + '.pdf');
  }

}
