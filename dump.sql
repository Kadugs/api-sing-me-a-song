CREATE TABLE public.recommendations (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL UNIQUE,
	"score" integer NOT NULL DEFAULT '0',
	CONSTRAINT "recommendations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);