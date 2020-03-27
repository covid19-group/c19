create extension pgcrypto;
  
create function random_string(length integer) returns text
	language plpgsql
as $$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$;

create table person
(
	id serial not null
		constraint person_pk
			primary key,
	phone text not null,
	created_on timestamp with time zone default now() not null,
	code text not null,
	verified boolean default false not null,
	reminders boolean default false not null,
	last_reminded timestamp with time zone,
	whatsapp boolean default false not null,
	phonehash text,
	consent boolean default false,
	primary_participant integer
)
;

alter table person owner to postgres
;

create unique index person_phone_uindex
	on person (phone)
;

create unique index person_id_uindex
	on person (id)
;

create index person_whatsapp_index
	on person (whatsapp)
;

create table message_log
(
	id serial not null
		constraint message_log_pkey
			primary key,
	person integer not null
		constraint message_log_person_id_fk
			references person
				on update cascade on delete cascade,
	type text not null,
	createdon timestamp with time zone default now() not null
)
;

alter table message_log owner to postgres
;

create unique index message_log_id_uindex
	on message_log (id)
;

create index message_log_person_index
	on message_log (person)
;

create table "_db"
(
	entity text not null,
	modifiedon timestamp with time zone default now() not null
)
;

alter table "_db" owner to postgres
;

create table participant
(
	id serial not null
		constraint participant_pkey
			primary key,
	person integer not null
		constraint participant_person_id_fk
			references person
				on update cascade on delete cascade
)
;

alter table participant owner to postgres
;

alter table person
	add constraint person_participant_id_fk
		foreign key (primary_participant) references participant
			on update cascade
;

create table survey
(
	id text default lower(random_string(10)) not null
		constraint survey_pk
			primary key,
	value text,
	created_on timestamp with time zone default now() not null,
	modified_on timestamp with time zone default now() not null,
	date date default CURRENT_DATE,
	person integer
		constraint survey_person_id_fk
			references person
				on update cascade on delete set null,
	participant integer
		constraint survey_participant_id_fk
			references participant
				on update cascade on delete set null
)
;

alter table survey owner to postgres
;

create unique index survey_id_uindex
	on survey (id)
;

create unique index participant_id_uindex
	on participant (id)
;
