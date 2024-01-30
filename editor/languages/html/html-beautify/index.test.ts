import { format } from "./index";
import { expect } from "chai";
import { VoidTagsTrailingSlashStyle, AttributeQuoteStyle } from "./FormatOptions";

describe('index', () => {
    it('should parse a div', () => {
        const input = "<div>hello</div>";
        const result = format(input);
        expect(result).to.eql(
`<div>hello</div>
`);
    });

    it('should not add inner whitespace for empty elements', () => {
        const input = "<div></div>";
        const result = format(input);
        expect(result).to.eql(
`<div></div>
`);
    });

    it('should parse an option with TMPL_V', () => {
        const input = `<option value="<TMPL_V orgunit.id>">
            <TMPL_V orgunit.name>
        </option>`;
        const result = format(input);
        expect(result).to.eql(
`<option value="<TMPL_V orgunit.id>">
    <TMPL_V orgunit.name>
</option>
`);
    });

    it('should parse TMPL_INLINE with path', () => {
        const input = `<TMPL_INLINE Misc/svg-icon-info.inc>`;
        const result = format(input);
        expect(result).to.eql(
`<TMPL_INLINE Misc/svg-icon-info.inc>
`);
    });

    it('should parse TMPL_FOR', () => {
        const input = '<TMPL_FOR orgunit IN=orgunits_for_form>';
        const result = format(input);
        expect(result).to.eql(
`<TMPL_FOR orgunit IN=orgunits_for_form>
`);
    });

    it('should parse input with decimals', () => {
        const input = '<input type="number" min=0 max=100 step=0.00001>';
        const result = format(input);
        expect(result).to.eql(
`<input
    type="number"
    min="0"
    max="100"
    step="0.00001"
>
`);
    });

    it('should parse inline IF', () => {
        const input = `<option value="<TMPL_V orgunit.id>" <TMPL_IF [% $team_id =~ $orgunit->{id} %]>selected</TMPL_IF>><TMPL_V orgunit.name>
        <TMPL_IF [% $orgunit->{id} > 1 %]> (<TMPL_V orgunit.id>)</TMPL_IF>
     </option>`;
        const result = format(input);
        expect(result).to.eql(
`<option value="<TMPL_V orgunit.id>" <TMPL_IF [% $team_id =~ $orgunit->{id} %]>selected</TMPL_IF>>
    <TMPL_V orgunit.name>
    <TMPL_IF [% $orgunit->{id} > 1 %]> (
        <TMPL_V orgunit.id>)
    </TMPL_IF>
</option>
`);
    });

    it('should parse IF with simple condition', () => {
        const input = '<TMPL_IF services.empty>';
        const result = format(input);
        expect(result).to.eql(
`<TMPL_IF services.empty>
`);

    });

    it('should de-indent with TMPL_ELSE', () => {
        const input = `<TMPL_IF services.empty>
    <div>
        hello
    </div>
<TMPL_ELSE>
    <div>
        bye
    </div>
</TMPL_IF>
`;
        const result = format(input);
        expect(result).to.eql(input);
    });

    it('should keep server-side comments', () => {
        const input = '## A comment';
        const result = format(input);
        expect(result).to.eql(input);
    });

    it('should keep server-side comments above div tag', () => {
        const input = `## A comment
<div>hello</div>`;
        const result = format(input);
        expect(result).to.eql(
            `## A comment
<div>hello</div>
`);
    });

    it('should read unquoted TMPL_V attribute values', () => {
        const input = "<input value=<TMPL_V whatever>>";
        const result = format(input);
        expect(result).to.eql(`<input value="<TMPL_V whatever>">\n`);
    });

    it('should parse attribute with embedded TMPL_IF', () => {
        const input = `<a href="https://docs.com/<TMPL_IF [% $service_type eq "service_health" %]>servicehealth/overview/tooling.html<TMPL_ELSE>slo/overview/tooling.html#how-its-work</TMPL_IF>" class="c-footlink bui-link bui-link--primary" title="Documentation" target="_blank">
    Documentation
</a>`;
        const result = format(input);
        expect(result).to.eql(`<a
    href='https://docs.com/<TMPL_IF [% $service_type eq "service_health" %]>servicehealth/overview/tooling.html<TMPL_ELSE>slo/overview/tooling.html#how-its-work</TMPL_IF>'
    class="c-footlink bui-link bui-link--primary"
    title="Documentation"
    target="_blank"
>
    Documentation
</a>
`);
    });

    it('should parse doctype', () => {
        const input = `<!DOCTYPE html>
<p>hello</p>`;
        const result = format(input);
        expect(result).to.eql(`<!DOCTYPE html>
<p>hello</p>
`);
    });

    it('should not indent or add new line after opening TMPL_WS', () => {
        const input = `<TMPL_WS FOLDLINE>
        <!doctype html>`;
        const result = format(input);
        expect(result).to.eql(`<TMPL_WS FOLDLINE><!doctype html>
`);
    });

    it('should not add a new line before closing TMPL_WS', () => {
        const input = `<TMPL_WS FOLDLINE><!DOCTYPE html>
        <html>
        </html>
        </TMPL_WS>`;
        const result = format(input);
        expect(result).to.eql(`<TMPL_WS FOLDLINE><!DOCTYPE html>
<html></html></TMPL_WS>
`);
    });

    it('should not format scripts', () => {
        const input = `    <script>
        require.config({
          baseUrl: "<TMPL_V ESCAPE=NONE calango_prefix>/js",
        });
        </script>
        `;
        const result = format(input);
        expect(result).to.eql(`<script>
        require.config({
          baseUrl: "<TMPL_V ESCAPE=NONE calango_prefix>/js",
        });
</script>
`);
    });

    it('should not format scripts inside div', () => {
        const input = `<div><script>
        require.config({
          baseUrl: "<TMPL_V ESCAPE=NONE calango_prefix>/js",
        });
        </script>
    </div>`;
        const result = format(input);
        expect(result).to.eql(`<div>
    <script>
        require.config({
          baseUrl: "<TMPL_V ESCAPE=NONE calango_prefix>/js",
        });
    </script>
</div>
`);
    });

    it('should support one-line inline scripts', () => {
        const input = '<script>var x = 1;</script>';
        const result = format(input);
        expect(result).to.eql(input + "\n");
    });

    it('should support one-line inline scripts inside div', () => {
        const input = '<div><script>var x = 1;</script></div>';
        const result = format(input);
        expect(result).to.eql(`<div>
    <script>var x = 1;</script>
</div>
`);
    });

    it('should support one-line script tags', () => {
        const input = '<script src="home.js"></script>';
        const result = format(input);
        expect(result).to.eql(input + "\n");
    });

    it('should support one-line script tags inside div', () => {
        const input = '<div><script src="home.js"></script></div>';
        const result = format(input);
        expect(result).to.eql(`<div>
    <script src="home.js"></script>
</div>
`);
    });

    it('should de-indent on self closing tags', () => {
        const input = `<div class="a">
    <div class="b">
        <p/>
    </div>
</div>
`;
        const result = format(input);
        expect(result).to.eql(input);
    });

    it('should not add whitespace on empty elements', () => {
        const input = `<div><p></p></div>`;
        const result = format(input);
        expect(result).to.eql(`<div>
    <p></p>
</div>
`);
    });

    it('should keep text without newlines on the same line', () => {
        const input = `<div><p>hello</p></div>`;
        const result = format(input);
        expect(result).to.eql(`<div>
    <p>hello</p>
</div>
`);
    });

    it('should break text with newlines apart', () => {
        const input = `<div><p>
        hello</p></div>`;
        const result = format(input);
        expect(result).to.eql(`<div>
    <p>
        hello
    </p>
</div>
`);
    });

    it('should not add new lines to already formatted multi-line text', () => {
        const input = `<div>
    <span class="foo">
        Properly formatted.
        Two lines.
    </span>
</div>`;
        const result = format(input);
        expect(result).to.eql(input + "\n");
    });

    it('should not add spaces inside textarea', () => {
        const input = `<div><textarea><TMPL_V foo></textarea></div>`;
        const result = format(input);
        expect(result).to.eql(`<div>
    <textarea><TMPL_V foo></textarea>
</div>
`);
    });

    it('should preserve whitespace around inline elements', () => {
        const input = `<div>
    <p>Delete <TMPL_V name> service?</p>
</div>`;
        const result = format(input);
        expect(result).to.eql(`<div>
    <p>Delete
        <TMPL_V name> service?
    </p>
</div>
`);
    });

    it('should format client-side comments', () => {
        const input = `<!-- begin of a -->
<div class="a">
    <!-- begin of b -->
    <div class="b">
        Hello.
    </div>
    <!-- end of b -->
</div>
<!-- end of a -->
`;
        const result = format(input);
        expect(result).to.eql(input);
    });

    it('should trim space of TMPL_INLINE argument', () => {
        const input = `<div>
    <TMPL_INLINE    Misc/svg-icon.inc
    >
</div>`;
        const result = format(input);
        expect(result).to.eql(`<div>
    <TMPL_INLINE Misc/svg-icon.inc>
</div>
`);
    });

    it('should support TMPL_VAR tag', () => {
        const input = `<div>
    <TMPL_VAR [% $criticality %]>
</div>
`;
        const result = format(input);
        expect(result).to.eql(input);
    });

    it('should support tags with normal attributes and perl expressions', () => {
        const input = `<div>
    <TMPL_V ESCAPE=NONE [% ifelse($required, '<span class="label label-warning">required</span>', '') %]>
</div>
`;
        const result = format(input);
        expect(result).to.eql(input);
    });

    it('should read XHTML doctype', () => {
        const input = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`;
        const result = format(input);
        expect(result).to.eql(input + "\n");
    });

    it('should support dollar sign variables', () => {
        const input = `<strong><TMPL_VAR $error_msg></strong>`;
        const result = format(input);
        expect(result).to.eql(`<strong>
    <TMPL_VAR $error_msg>
</strong>
`);
    });

    it('should read a comment at client-side comment at eof', () => {
        const input = `<!-- Keep file as deleting it causes server to fail -->`;
        const result = format(input);
        expect(result).to.eql(input + "\n");
    });

    it('should read hyphened attribute names', () => {
        const input = `<div><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button></div>`;
        const result = format(input);
        expect(result).to.eql(`<div>
    <button type="button" class="close" data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
`);
    });

    it('should read unquoted attribute width=100%', () => {
        const input = `<table width=100% border=0></table>`;
        const result = format(input, { attributeQuoteStyle: AttributeQuoteStyle.Preserve });
        expect(result).to.eql(input + "\n");
    });

    it('should read unquoted attribute size=-1', () => {
        const input = `<font size=-1>hello</font>`;
        const result = format(input, { attributeQuoteStyle: AttributeQuoteStyle.Preserve });
        expect(result).to.eql(input + "\n");
    });

    it('should read unquoted attribute size=+1', () => {
        const input = `<font size=+1>hello</font>`;
        const result = format(input, { attributeQuoteStyle: AttributeQuoteStyle.Preserve });
        expect(result).to.eql(input + "\n");
    });

    it('should read perl expressions inside tags inside attribute values', () => {
        const input = `<TMPL_FOR incident IN=incidents>
    <option value=<TMPL_VAR [% $incident->id %]>>
        <TMPL_VAR [% $incident->display_name %]>
    </option>
</TMPL_FOR>
`;
        const result = format(input);
        expect(result).to.eql(`<TMPL_FOR incident IN=incidents>
    <option value="<TMPL_VAR [% $incident->id %]>">
        <TMPL_VAR [% $incident->display_name %]>
    </option>
</TMPL_FOR>
`);
    });

    it('should support TMPL_STATIC_URL', () => {
        const input = `<link rel="stylesheet" href="<TMPL_STATIC_URL jquery-datatables/1.10.13/css/jquery.dataTables.min.css>">`;
        const result = format(input);
        expect(result).to.eql(input + "\n");
    });

    it('should support TMPL_URI', () => {
        const input = `<form class="form" action="<TMPL_URI SQLiTickets/_/generate_new_tickets>" method="POST">`;
        const result = format(input);
        expect(result).to.eql(input + "\n");
    });

    it('should support TMPL_V expressions as attributes', () => {
        const input = `<option value="0" <TMPL_V [% $ticket->{period} eq '0' ? 'selected' : '' %]>>Never</option>`;
        const result = format(input);
        expect(result).to.eql(input + "\n");
    });

    it('should support <~TMPL_V ~> tags', () => {
        const input = `<h2 class="note-text">
    <~TMPL_V escape=HTML report.slide.noteText~>
</h2>
`;
        const result = format(input);
        expect(result).to.eql(input);
    });

    describe('voidTagsTrailingSlashStyle', () => {
        it('default', () => {
            const input = `<div><br><br/><br /><span/></div>`;
            const result = format(input, { voidTagsTrailingSlashStyle: VoidTagsTrailingSlashStyle.Remove });
            expect(result).to.eql(`<div>
    <br>
    <br>
    <br>
    <span/>
</div>
`);
        });

        it('preserve', () => {
            const input = `<div><br><br/><br /><span/></div>`;
            const result = format(input, { voidTagsTrailingSlashStyle: VoidTagsTrailingSlashStyle.Preserve });
            expect(result).to.eql(`<div>
    <br>
    <br/>
    <br/>
    <span/>
</div>
`);
        });

        it('add', () => {
            const input = `<div><br><br/><br /><span/></div>`;
            const result = format(input, { voidTagsTrailingSlashStyle: VoidTagsTrailingSlashStyle.Add });
            expect(result).to.eql(`<div>
    <br/>
    <br/>
    <br/>
    <span/>
</div>
`);
        });

        it('remove', () => {
            const input = `<div><br><br/><br /><span/></div>`;
            const result = format(input, { voidTagsTrailingSlashStyle: VoidTagsTrailingSlashStyle.Remove });
            expect(result).to.eql(`<div>
    <br>
    <br>
    <br>
    <span/>
</div>
`);
        });
    });

    describe('attributeQuoteStyle', () => {
        it('default', () => {
            const input = `<input required name='age' type="number" autocomplete=off [% perl expression %] value=<TMPL_V age> onclick='alert("hello");'>`;
            const result = format(input, { attributeQuoteStyle: AttributeQuoteStyle.Add });
            expect(result).to.eql(`<input
    required
    name="age"
    type="number"
    autocomplete="off"
    [% perl expression %]
    value="<TMPL_V age>"
    onclick='alert("hello");'
>
`);
        });

        it('preserve', () => {
            const input = `<input required name='age' type="number" autocomplete=off [% perl expression %] value=<TMPL_V age> onclick='alert("hello");'>`;
            const result = format(input, { attributeQuoteStyle: AttributeQuoteStyle.Preserve });
            expect(result).to.eql(`<input
    required
    name='age'
    type="number"
    autocomplete=off
    [% perl expression %]
    value=<TMPL_V age>
    onclick='alert("hello");'
>
`);
        });

        it('add', () => {
            const input = `<input required name='age' type="number" autocomplete=off [% perl expression %] value=<TMPL_V age> onclick='alert("hello");'>`;
            const result = format(input, { attributeQuoteStyle: AttributeQuoteStyle.Add });
            expect(result).to.eql(`<input
    required
    name="age"
    type="number"
    autocomplete="off"
    [% perl expression %]
    value="<TMPL_V age>"
    onclick='alert("hello");'
>
`);
        });

        it('should not add on TMPL tags', () => {
            const input = `<TMPL_FOR report IN=reports OUT="whatever">`;
            const result = format(input, { attributeQuoteStyle: AttributeQuoteStyle.Add });
            expect(result).to.eql(input + "\n");
        });
    });

    it('should support expressions with arrows', () => {
        const input = `<div>
        <TMPL_INLINE SliTypeValue.inc class="boo" id=[% $objective->{id} %] type="" value="" role=[% $service->{ref}->{name} %]>
        </div>`;
        const result = format(input, { multilineAttributeThreshold: 2 });
        expect(result).to.eql(`<div>
    <TMPL_INLINE
        SliTypeValue.inc
        class="boo"
        id=[% $objective->{id} %]
        type=""
        value=""
        role=[% $service->{ref}->{name} %]
    >
</div>
`);
    });

    it('should not escape TMPL_V inside attribute', () => {
        const input = `<input value="<TMPL_V escape=HTML objective>">`;
        const result = format(input);
        expect(result).to.eql('<input value="<TMPL_V escape=HTML objective>">\n');
    });

    it('should support perl expressions inside a tag inside an attribute value', () => {
        const input = `<script src="<TMPL_STATIC_URL [% "path/$version/app.js" %]>"></script>`;
        const result = format(input);
        expect(result).to.eql(`<script src='<TMPL_STATIC_URL [% "path/$version/app.js" %]>'></script>\n`);
    });

    it('should add quotes to value attribute if it consists of just a <TMPL_V tag which does not have quotes', () => {
        const input = `<input value=<TMPL_V escape=HTML objective.id>>`;
        const result = format(input);
        expect(result).to.eql(`<input value="<TMPL_V escape=HTML objective.id>">\n`);
    });

    it('should support bracket attribute', () => {
        const input = `<div [attr]="value" [attr2]="value2" [attr3]="value3" [attr4]="value4">`;
        const result = format(input);
        expect(result).to.eql(`<div
    [attr]="value"
    [attr2]="value2"
    [attr3]="value3"
    [attr4]="value4"
>
`);
    });

    describe('extraNonIndentingTags', () => {
        it('should indent head and body', () => {
            const input = `<html>
            <head>
                <title>Hello</title>
            </head>
            <body>
                <h1>Hi</h1>
            </body>
            </html>`;
            const result = format(input);
            expect(result).to.eql(`<html>
    <head>
        <title>Hello</title>
    </head>
    <body>
        <h1>Hi</h1>
    </body>
</html>
`);
        });

        it('should not indent head and body', () => {
            const input = `<html>
            <head>
                <title>Hello</title>
            </head>
            <body>
                <h1>Hi</h1>
            </body>
            </html>`;
            const result = format(input, { extraNonIndentingTags: ['html'] });
            expect(result).to.eql(`<html>
<head>
    <title>Hello</title>
</head>
<body>
    <h1>Hi</h1>
</body>
</html>
`);
        })
    });
});
