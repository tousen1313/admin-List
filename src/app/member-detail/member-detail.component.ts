import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../member';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @Input() member: Member;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.memberService.getMember(id)
      .subscribe(member => this.member = member);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.memberService.updateMember(this.member)
      .subscribe(() => this.goBack());
  }
}
