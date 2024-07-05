import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
  URL: { input: any; output: any; }
};

export type AcceptInviteToPublicationInput = {
  /** The invitation token to accept. */
  inviteToken: Scalars['String']['input'];
};

/** Response to accepting an invitation to join a publication. */
export type AcceptInviteToPublicationPayload = {
  __typename?: 'AcceptInviteToPublicationPayload';
  /** Signifies if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** Input to accept a role based invite. */
export type AcceptRoleBasedInviteInput = {
  /** Invite token of the role based invite. */
  inviteToken: Scalars['String']['input'];
};

/** Input to toggle role based invite links. */
export type AcceptRoleBasedInvitePayload = {
  __typename?: 'AcceptRoleBasedInvitePayload';
  /** Signifies if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

export type AddCommentInput = {
  contentMarkdown: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};

export type AddCommentPayload = {
  __typename?: 'AddCommentPayload';
  comment?: Maybe<Comment>;
};

export type AddPostToSeriesInput = {
  /** The ID of the post to be added to the series. */
  postId: Scalars['ObjectId']['input'];
  /** The ID of the series to which the post is to be added. */
  seriesId: Scalars['ObjectId']['input'];
};

export type AddPostToSeriesPayload = {
  __typename?: 'AddPostToSeriesPayload';
  /** The series to which the post was added. */
  series?: Maybe<Series>;
};

export type AddReplyInput = {
  commentId: Scalars['ID']['input'];
  contentMarkdown: Scalars['String']['input'];
};

export type AddReplyPayload = {
  __typename?: 'AddReplyPayload';
  reply?: Maybe<Reply>;
};

/**
 * Contains the flag indicating if the audio blog feature is enabled or not.
 * User can enable or disable the audio blog feature from the publication settings.
 * Shows audio player on blogs if enabled.
 */
export type AudioBlogFeature = Feature & {
  __typename?: 'AudioBlogFeature';
  /** A flag indicating if the audio blog feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
  /** The voice type for the audio blog. */
  voiceType: AudioBlogVoiceType;
};

/** The voice type for the audio blog. */
export enum AudioBlogVoiceType {
  /** Enum for the female voice type of the audio blog. */
  Female = 'FEMALE',
  /** Enum for the male voice type of the audio blog. */
  Male = 'MALE'
}

/** Used when Audioblog feature is enabled. Contains URLs to the audioblog of the post. */
export type AudioUrls = {
  __typename?: 'AudioUrls';
  /** Female version of audio url of the post. */
  female?: Maybe<Scalars['String']['output']>;
  /** Male version of audio url of the post. */
  male?: Maybe<Scalars['String']['output']>;
};

/** The status of the backup i.e., success or failure. */
export enum BackupStatus {
  /** The backup failed. */
  Failed = 'failed',
  /** The backup was successful. */
  Success = 'success'
}

/** A badge that the user has earned. */
export type Badge = Node & {
  __typename?: 'Badge';
  /** The date the badge was earned. */
  dateAssigned?: Maybe<Scalars['DateTime']['output']>;
  /** The description of the badge. */
  description?: Maybe<Scalars['String']['output']>;
  /** The ID of the badge. */
  id: Scalars['ID']['output'];
  /** The image of the badge. */
  image: Scalars['String']['output'];
  /** Link to badge page on Hashnode. */
  infoURL?: Maybe<Scalars['String']['output']>;
  /** The name of the badge. */
  name: Scalars['String']['output'];
  /** A flag to determine if the badge is hidden. */
  suppressed?: Maybe<Scalars['Boolean']['output']>;
};

/**
 * Contains basic information about the beta feature.
 * A beta feature is a feature that is not yet released to all users.
 */
export type BetaFeature = Node & {
  __typename?: 'BetaFeature';
  /** The description of the beta feature. */
  description?: Maybe<Scalars['String']['output']>;
  /** The date the beta feature was created. */
  enabled: Scalars['Boolean']['output'];
  /** The ID of the beta feature. */
  id: Scalars['ID']['output'];
  /** The key of the beta feature. */
  key: Scalars['String']['output'];
  /** The title of the beta feature. */
  title?: Maybe<Scalars['String']['output']>;
  /** The url of the beta feature. */
  url?: Maybe<Scalars['String']['output']>;
};

export type CancelScheduledDraftInput = {
  /** The Draft ID of the scheduled draft. */
  draftId: Scalars['ID']['input'];
};

export type CancelScheduledDraftPayload = {
  __typename?: 'CancelScheduledDraftPayload';
  /** Payload returned in response of cancel scheduled post mutation. */
  scheduledPost: ScheduledPost;
};

/** Input to change the role of a user in a publication. */
export type ChangePublicationMemberRoleInput = {
  /** The publication ID the user is a member of. */
  publicationId: Scalars['ID']['input'];
  /** The role of the user in the publication. */
  role: UserPublicationRole;
  /** The username of the user to change the role for. */
  username: Scalars['String']['input'];
};

/** Response to changing the role of a user in a publication. */
export type ChangePublicationMemberRolePayload = {
  __typename?: 'ChangePublicationMemberRolePayload';
  /** The updated publication member. */
  member: PublicationMember;
};

/** Input to change the privacy state of a user in a publication. */
export type ChangePublicationMemberVisibilityInput = {
  /**
   * The privacy state of the user in the publication.
   * PRIVATE members are not visible on the members page while PUBLIC members are visible.
   */
  privacyState: PublicationMemberPrivacyState;
  /** The publication ID the user is a member of. */
  publicationId: Scalars['ID']['input'];
  /** The username of the user to change the role for. */
  username: Scalars['String']['input'];
};

/** Response to changing the privacy state of a user in a publication. */
export type ChangePublicationMemberVisibilityPayload = {
  __typename?: 'ChangePublicationMemberVisibilityPayload';
  /** The updated publication member. */
  member: PublicationMember;
};

/**
 * Contains basic information about the comment.
 * A comment is a response to a post.
 */
export type Comment = Node & {
  __typename?: 'Comment';
  /** The author of the comment. */
  author: User;
  /** The content of the comment in markdown and html format. */
  content: Content;
  /** The date the comment was created. */
  dateAdded: Scalars['DateTime']['output'];
  /** The ID of the comment. */
  id: Scalars['ID']['output'];
  /** Total number of reactions on the comment by the authenticated user. User must be authenticated to use this field. */
  myTotalReactions: Scalars['Int']['output'];
  /** Returns a list of replies to the comment. */
  replies: CommentReplyConnection;
  /** A unique string identifying the comment. Used as element id in the DOM on hashnode blogs. */
  stamp?: Maybe<Scalars['String']['output']>;
  /** Total number of reactions on the comment. Reactions are hearts added to any comment. */
  totalReactions: Scalars['Int']['output'];
};


/**
 * Contains basic information about the comment.
 * A comment is a response to a post.
 */
export type CommentRepliesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

/**
 * Connection to get list of replies to a comment.
 * Returns a list of edges which contains the posts in publication and cursor to the last item of the previous page.
 */
export type CommentReplyConnection = Connection & {
  __typename?: 'CommentReplyConnection';
  /**
   * A list of edges containing nodes in the connection.
   * A node contains a reply to a comment.
   */
  edges: Array<CommentReplyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/** An edge that contains a node of type reply and cursor to the node. */
export type CommentReplyEdge = Edge & {
  __typename?: 'CommentReplyEdge';
  /** A cursor to the last item of the previous page. */
  cursor: Scalars['String']['output'];
  /** The node containing a reply to a comment. */
  node: Reply;
};

/**
 * Connection to get list of top commenters. Contains a list of edges containing nodes.
 * Each node is a user who commented recently.
 * Page info contains information about pagination like hasNextPage and endCursor.
 */
export type CommenterUserConnection = Connection & {
  __typename?: 'CommenterUserConnection';
  /** A list of edges of commenters. */
  edges: Array<UserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * Connection to get list of items.
 * Returns a list of edges which contains the items and cursor to the last item of the previous page.
 * This is a common interface for all connections.
 */
export type Connection = {
  /** A list of edges of items connection. */
  edges: Array<Edge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type Content = {
  __typename?: 'Content';
  /** The HTML version of the content. */
  html: Scalars['String']['output'];
  /** The Markdown version of the content. */
  markdown: Scalars['String']['output'];
  /** The text version from sanitized html content. HTML tags are stripped and only text is returned. */
  text: Scalars['String']['output'];
};

/** Two letter ISO 3166-1 alpha-2 country code. */
export enum CountryCodeAlpha2 {
  /** Andorra */
  Ad = 'AD',
  /** United Arab Emirates */
  Ae = 'AE',
  /** Afghanistan */
  Af = 'AF',
  /** Antigua and Barbuda */
  Ag = 'AG',
  /** Anguilla */
  Ai = 'AI',
  /** Albania */
  Al = 'AL',
  /** Armenia */
  Am = 'AM',
  /** Angola */
  Ao = 'AO',
  /** Antarctica */
  Aq = 'AQ',
  /** Argentina */
  Ar = 'AR',
  /** American Samoa */
  As = 'AS',
  /** Austria */
  At = 'AT',
  /** Australia */
  Au = 'AU',
  /** Aruba */
  Aw = 'AW',
  /** Åland Islands */
  Ax = 'AX',
  /** Azerbaijan */
  Az = 'AZ',
  /** Bosnia and Herzegovina */
  Ba = 'BA',
  /** Barbados */
  Bb = 'BB',
  /** Bangladesh */
  Bd = 'BD',
  /** Belgium */
  Be = 'BE',
  /** Burkina Faso */
  Bf = 'BF',
  /** Bulgaria */
  Bg = 'BG',
  /** Bahrain */
  Bh = 'BH',
  /** Burundi */
  Bi = 'BI',
  /** Benin */
  Bj = 'BJ',
  /** Saint Barthélemy */
  Bl = 'BL',
  /** Bermuda */
  Bm = 'BM',
  /** Brunei Darussalam */
  Bn = 'BN',
  /** Bolivia (Plurinational State of) */
  Bo = 'BO',
  /** Bonaire, Sint Eustatius and Saba */
  Bq = 'BQ',
  /** Brazil */
  Br = 'BR',
  /** Bahamas */
  Bs = 'BS',
  /** Bhutan */
  Bt = 'BT',
  /** Bouvet Island */
  Bv = 'BV',
  /** Botswana */
  Bw = 'BW',
  /** Belarus */
  By = 'BY',
  /** Belize */
  Bz = 'BZ',
  /** Canada */
  Ca = 'CA',
  /** Cocos (Keeling) Islands */
  Cc = 'CC',
  /** Congo, Democratic Republic of the */
  Cd = 'CD',
  /** Central African Republic */
  Cf = 'CF',
  /** Congo */
  Cg = 'CG',
  /** Switzerland */
  Ch = 'CH',
  /** Côte d'Ivoire */
  Ci = 'CI',
  /** Cook Islands */
  Ck = 'CK',
  /** Chile */
  Cl = 'CL',
  /** Cameroon */
  Cm = 'CM',
  /** China */
  Cn = 'CN',
  /** Colombia */
  Co = 'CO',
  /** Costa Rica */
  Cr = 'CR',
  /** Cuba */
  Cu = 'CU',
  /** Cabo Verde */
  Cv = 'CV',
  /** Curaçao */
  Cw = 'CW',
  /** Christmas Island */
  Cx = 'CX',
  /** Cyprus */
  Cy = 'CY',
  /** Czechia */
  Cz = 'CZ',
  /** Germany */
  De = 'DE',
  /** Djibouti */
  Dj = 'DJ',
  /** Denmark */
  Dk = 'DK',
  /** Dominica */
  Dm = 'DM',
  /** Dominican Republic */
  Do = 'DO',
  /** Algeria */
  Dz = 'DZ',
  /** Ecuador */
  Ec = 'EC',
  /** Estonia */
  Ee = 'EE',
  /** Egypt */
  Eg = 'EG',
  /** Western Sahara */
  Eh = 'EH',
  /** Eritrea */
  Er = 'ER',
  /** Spain */
  Es = 'ES',
  /** Ethiopia */
  Et = 'ET',
  /** Finland */
  Fi = 'FI',
  /** Fiji */
  Fj = 'FJ',
  /** Falkland Islands (Malvinas) */
  Fk = 'FK',
  /** Micronesia (Federated States of) */
  Fm = 'FM',
  /** Faroe Islands */
  Fo = 'FO',
  /** France */
  Fr = 'FR',
  /** Gabon */
  Ga = 'GA',
  /** United Kingdom of Great Britain and Northern Ireland */
  Gb = 'GB',
  /** Grenada */
  Gd = 'GD',
  /** Georgia */
  Ge = 'GE',
  /** French Guiana */
  Gf = 'GF',
  /** Guernsey */
  Gg = 'GG',
  /** Ghana */
  Gh = 'GH',
  /** Gibraltar */
  Gi = 'GI',
  /** Greenland */
  Gl = 'GL',
  /** Gambia */
  Gm = 'GM',
  /** Guinea */
  Gn = 'GN',
  /** Guadeloupe */
  Gp = 'GP',
  /** Equatorial Guinea */
  Gq = 'GQ',
  /** Greece */
  Gr = 'GR',
  /** South Georgia and the South Sandwich Islands */
  Gs = 'GS',
  /** Guatemala */
  Gt = 'GT',
  /** Guam */
  Gu = 'GU',
  /** Guinea-Bissau */
  Gw = 'GW',
  /** Guyana */
  Gy = 'GY',
  /** Hong Kong */
  Hk = 'HK',
  /** Heard Island and McDonald Islands */
  Hm = 'HM',
  /** Honduras */
  Hn = 'HN',
  /** Croatia */
  Hr = 'HR',
  /** Haiti */
  Ht = 'HT',
  /** Hungary */
  Hu = 'HU',
  /** Indonesia */
  Id = 'ID',
  /** Ireland */
  Ie = 'IE',
  /** Israel */
  Il = 'IL',
  /** Isle of Man */
  Im = 'IM',
  /** India */
  In = 'IN',
  /** British Indian Ocean Territory */
  Io = 'IO',
  /** Iraq */
  Iq = 'IQ',
  /** Iran (Islamic Republic of) */
  Ir = 'IR',
  /** Iceland */
  Is = 'IS',
  /** Italy */
  It = 'IT',
  /** Jersey */
  Je = 'JE',
  /** Jamaica */
  Jm = 'JM',
  /** Jordan */
  Jo = 'JO',
  /** Japan */
  Jp = 'JP',
  /** Kenya */
  Ke = 'KE',
  /** Kyrgyzstan */
  Kg = 'KG',
  /** Cambodia */
  Kh = 'KH',
  /** Kiribati */
  Ki = 'KI',
  /** Comoros */
  Km = 'KM',
  /** Saint Kitts and Nevis */
  Kn = 'KN',
  /** Korea (Democratic People's Republic of) */
  Kp = 'KP',
  /** Korea, Republic of */
  Kr = 'KR',
  /** Kuwait */
  Kw = 'KW',
  /** Cayman Islands */
  Ky = 'KY',
  /** Kazakhstan */
  Kz = 'KZ',
  /** Lao People's Democratic Republic */
  La = 'LA',
  /** Lebanon */
  Lb = 'LB',
  /** Saint Lucia */
  Lc = 'LC',
  /** Liechtenstein */
  Li = 'LI',
  /** Sri Lanka */
  Lk = 'LK',
  /** Liberia */
  Lr = 'LR',
  /** Lesotho */
  Ls = 'LS',
  /** Lithuania */
  Lt = 'LT',
  /** Luxembourg */
  Lu = 'LU',
  /** Latvia */
  Lv = 'LV',
  /** Libya */
  Ly = 'LY',
  /** Morocco */
  Ma = 'MA',
  /** Monaco */
  Mc = 'MC',
  /** Moldova, Republic of */
  Md = 'MD',
  /** Montenegro */
  Me = 'ME',
  /** Saint Martin (French part) */
  Mf = 'MF',
  /** Madagascar */
  Mg = 'MG',
  /** Marshall Islands */
  Mh = 'MH',
  /** North Macedonia */
  Mk = 'MK',
  /** Mali */
  Ml = 'ML',
  /** Myanmar */
  Mm = 'MM',
  /** Mongolia */
  Mn = 'MN',
  /** Macao */
  Mo = 'MO',
  /** Northern Mariana Islands */
  Mp = 'MP',
  /** Martinique */
  Mq = 'MQ',
  /** Mauritania */
  Mr = 'MR',
  /** Montserrat */
  Ms = 'MS',
  /** Malta */
  Mt = 'MT',
  /** Mauritius */
  Mu = 'MU',
  /** Maldives */
  Mv = 'MV',
  /** Malawi */
  Mw = 'MW',
  /** Mexico */
  Mx = 'MX',
  /** Malaysia */
  My = 'MY',
  /** Mozambique */
  Mz = 'MZ',
  /** Namibia */
  Na = 'NA',
  /** New Caledonia */
  Nc = 'NC',
  /** Niger */
  Ne = 'NE',
  /** Norfolk Island */
  Nf = 'NF',
  /** Nigeria */
  Ng = 'NG',
  /** Nicaragua */
  Ni = 'NI',
  /** Netherlands */
  Nl = 'NL',
  /** Norway */
  No = 'NO',
  /** Nepal */
  Np = 'NP',
  /** Nauru */
  Nr = 'NR',
  /** Niue */
  Nu = 'NU',
  /** New Zealand */
  Nz = 'NZ',
  /** Oman */
  Om = 'OM',
  /** Panama */
  Pa = 'PA',
  /** Peru */
  Pe = 'PE',
  /** French Polynesia */
  Pf = 'PF',
  /** Papua New Guinea */
  Pg = 'PG',
  /** Philippines */
  Ph = 'PH',
  /** Pakistan */
  Pk = 'PK',
  /** Poland */
  Pl = 'PL',
  /** Saint Pierre and Miquelon */
  Pm = 'PM',
  /** Pitcairn */
  Pn = 'PN',
  /** Puerto Rico */
  Pr = 'PR',
  /** Palestine, State of */
  Ps = 'PS',
  /** Portugal */
  Pt = 'PT',
  /** Palau */
  Pw = 'PW',
  /** Paraguay */
  Py = 'PY',
  /** Qatar */
  Qa = 'QA',
  /** Réunion */
  Re = 'RE',
  /** Romania */
  Ro = 'RO',
  /** Serbia */
  Rs = 'RS',
  /** Russian Federation */
  Ru = 'RU',
  /** Rwanda */
  Rw = 'RW',
  /** Saudi Arabia */
  Sa = 'SA',
  /** Solomon Islands */
  Sb = 'SB',
  /** Seychelles */
  Sc = 'SC',
  /** Sudan */
  Sd = 'SD',
  /** Sweden */
  Se = 'SE',
  /** Singapore */
  Sg = 'SG',
  /** Saint Helena, Ascension and Tristan da Cunha */
  Sh = 'SH',
  /** Slovenia */
  Si = 'SI',
  /** Svalbard and Jan Mayen */
  Sj = 'SJ',
  /** Slovakia */
  Sk = 'SK',
  /** Sierra Leone */
  Sl = 'SL',
  /** San Marino */
  Sm = 'SM',
  /** Senegal */
  Sn = 'SN',
  /** Somalia */
  So = 'SO',
  /** Suriname */
  Sr = 'SR',
  /** South Sudan */
  Ss = 'SS',
  /** Sao Tome and Principe */
  St = 'ST',
  /** El Salvador */
  Sv = 'SV',
  /** Sint Maarten (Dutch part) */
  Sx = 'SX',
  /** Syrian Arab Republic */
  Sy = 'SY',
  /** Eswatini */
  Sz = 'SZ',
  /** Turks and Caicos Islands */
  Tc = 'TC',
  /** Chad */
  Td = 'TD',
  /** French Southern Territories */
  Tf = 'TF',
  /** Togo */
  Tg = 'TG',
  /** Thailand */
  Th = 'TH',
  /** Tajikistan */
  Tj = 'TJ',
  /** Tokelau */
  Tk = 'TK',
  /** Timor-Leste */
  Tl = 'TL',
  /** Turkmenistan */
  Tm = 'TM',
  /** Tunisia */
  Tn = 'TN',
  /** Tonga */
  To = 'TO',
  /** Turkey */
  Tr = 'TR',
  /** Trinidad and Tobago */
  Tt = 'TT',
  /** Tuvalu */
  Tv = 'TV',
  /** Taiwan, Province of China */
  Tw = 'TW',
  /** Tanzania, United Republic of */
  Tz = 'TZ',
  /** Ukraine */
  Ua = 'UA',
  /** Uganda */
  Ug = 'UG',
  /** United States Minor Outlying Islands */
  Um = 'UM',
  /** United States of America */
  Us = 'US',
  /** Uruguay */
  Uy = 'UY',
  /** Uzbekistan */
  Uz = 'UZ',
  /** Holy See */
  Va = 'VA',
  /** Saint Vincent and the Grenadines */
  Vc = 'VC',
  /** Venezuela (Bolivarian Republic of) */
  Ve = 'VE',
  /** Virgin Islands (British) */
  Vg = 'VG',
  /** Virgin Islands (U.S.) */
  Vi = 'VI',
  /** Viet Nam */
  Vn = 'VN',
  /** Vanuatu */
  Vu = 'VU',
  /** Wallis and Futuna */
  Wf = 'WF',
  /** Samoa */
  Ws = 'WS',
  /** Yemen */
  Ye = 'YE',
  /** Mayotte */
  Yt = 'YT',
  /** South Africa */
  Za = 'ZA',
  /** Zambia */
  Zm = 'ZM',
  /** Zimbabwe */
  Zw = 'ZW',
  /** Unknown */
  Zz = 'ZZ'
}

/** Contains information about cover image options of the post. Like URL of the cover image, attribution, etc. */
export type CoverImageOptionsInput = {
  /** Information about the cover image attribution. */
  coverImageAttribution?: InputMaybe<Scalars['String']['input']>;
  /** The name of the cover image photographer, used when cover was chosen from unsplash. */
  coverImagePhotographer?: InputMaybe<Scalars['String']['input']>;
  /** The URL of the cover image. */
  coverImageURL?: InputMaybe<Scalars['String']['input']>;
  /** A flag to indicate if the cover attribution is hidden, used when cover was chosen from unsplash. */
  isCoverAttributionHidden?: InputMaybe<Scalars['Boolean']['input']>;
  /** A flag to indicate if the cover image is sticked to bottom. */
  stickCoverToBottom?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateDraftInput = {
  /** Ids of the co-authors of the resulting draft. */
  coAuthors?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
  /** Content of the resulting draft in markdown format. */
  contentMarkdown?: InputMaybe<Scalars['String']['input']>;
  /** Options for the cover image of the resulting draft. */
  coverImageOptions?: InputMaybe<CoverImageOptionsInput>;
  /** A flag to indicate if the comments are disabled for the resulting draft. */
  disableComments?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * The id of the user who owns the draft. When this field is supplied, the draft is created directly under that user's account.
   * Only applicable for team publications.
   */
  draftOwner?: InputMaybe<Scalars['ID']['input']>;
  /** Information about the meta tags added to the resulting draft, used for SEO purpose. */
  metaTags?: InputMaybe<MetaTagsInput>;
  /** The URL of the original article if the draft is imported from an external source. */
  originalArticleURL?: InputMaybe<Scalars['String']['input']>;
  /** The ID of publication the draft and resulting post belongs to. */
  publicationId: Scalars['ID']['input'];
  /**
   * Publish the draft on behalf of another user who is a member of the publication.
   *
   * Only applicable for team publications.
   */
  publishAs?: InputMaybe<Scalars['ObjectId']['input']>;
  /** Date when the resulting draft is published. */
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Providing a seriesId will add the resulting draft to that series. */
  seriesId?: InputMaybe<Scalars['ObjectId']['input']>;
  /** Settings for the resulting draft like table of contents and newsletter activation. */
  settings?: InputMaybe<CreateDraftSettingsInput>;
  /** Slug of the resulting draft. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The subtitle of the resulting draft. */
  subtitle?: InputMaybe<Scalars['String']['input']>;
  /** A list of tags added to the resulting draft. */
  tags?: InputMaybe<Array<CreateDraftTagInput>>;
  /** The title of the resulting draft. */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDraftPayload = {
  __typename?: 'CreateDraftPayload';
  /** The newly created draft */
  draft?: Maybe<Draft>;
};

export type CreateDraftSettingsInput = {
  /** Whether to send a newsletter for the resulting draft's post. */
  activateNewsletter?: InputMaybe<Scalars['Boolean']['input']>;
  /** A flag to indicate if the resulting draft should be delisted, used to hide the post created from the draft from public feed. */
  delist?: InputMaybe<Scalars['Boolean']['input']>;
  /** A flag to indicate if the resulting draft'S post should contain a table of content */
  enableTableOfContent?: InputMaybe<Scalars['Boolean']['input']>;
  /** Flag to indicate if the slug is overridden by the user. */
  slugOverridden?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateDraftTagInput = {
  /**
   * A tag id that is referencing an existing tag.
   *
   * Either this or name and slug should be provided. If both are provided, the id will be used.
   */
  id?: InputMaybe<Scalars['ObjectId']['input']>;
  /**
   * A name of a new tag to create.
   *
   * Either this and slug or id should be provided. If both are provided, the id will be used.
   */
  name?: InputMaybe<Scalars['String']['input']>;
  /**
   * A slug of a new tag to create.
   *
   * Either this and name or id should be provided. If both are provided, the id will be used.
   */
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRedirectionRuleInput = {
  destination: Scalars['URL']['input'];
  publicationId: Scalars['ID']['input'];
  source: Scalars['String']['input'];
  type: HttpRedirectionType;
};

export type CreateRedirectionRulePayload = {
  __typename?: 'CreateRedirectionRulePayload';
  redirectionRule: RedirectionRule;
};

/** Input to create a role based invite for a publication. */
export type CreateRoleBasedInviteForPublicationInput = {
  /** The capacity of how many members to be invited by the link. */
  capacity?: InputMaybe<Scalars['Int']['input']>;
  /** Boolean to enable unlimited capacity. */
  enableUnlimitedCapacity?: InputMaybe<Scalars['Boolean']['input']>;
  /** The expiry date of the invite. */
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Invite token set for the invitation */
  inviteToken?: InputMaybe<Scalars['String']['input']>;
  /** The publication ID to create the invite for. */
  publicationId: Scalars['ID']['input'];
  /** The role to assign to the user in the publication. */
  role: UserPublicationInviteRole;
};

/** Response to creating a role based invite for a publication. */
export type CreateRoleBasedInviteForPublicationPayload = {
  __typename?: 'CreateRoleBasedInviteForPublicationPayload';
  /** The created role based invite. */
  invite: RoleBasedInvite;
};

export type CreateSeriesInput = {
  /** The cover image of the series. */
  coverImage?: InputMaybe<Scalars['String']['input']>;
  /** The description of the series. Accepts markdown. */
  descriptionMarkdown?: InputMaybe<Scalars['String']['input']>;
  /** The name of the series. */
  name: Scalars['String']['input'];
  /** The id of the publication the series belongs to. */
  publicationId: Scalars['ID']['input'];
  /** The slug of the series. Used to access series page.  Example https://johndoe.com/series/series-slug */
  slug: Scalars['String']['input'];
  /** The sort order of the series, determines if the latest posts should appear first or last in series. */
  sortOrder?: InputMaybe<SortOrder>;
};

export type CreateSeriesPayload = {
  __typename?: 'CreateSeriesPayload';
  /** Returns the created series. */
  series: Series;
};

export type CreateWebhookInput = {
  events: Array<WebhookEvent>;
  publicationId: Scalars['ID']['input'];
  secret: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateWebhookPayload = {
  __typename?: 'CreateWebhookPayload';
  webhook?: Maybe<Webhook>;
};

export type CustomCss = {
  __typename?: 'CustomCSS';
  /** Custom CSS that will be applied on the publication homepage. */
  home?: Maybe<Scalars['String']['output']>;
  /** The same as `home` but minified. */
  homeMinified?: Maybe<Scalars['String']['output']>;
  /** Custom CSS that will be applied on all posts of the publication. */
  post?: Maybe<Scalars['String']['output']>;
  /** The same as `post` but minified. */
  postMinified?: Maybe<Scalars['String']['output']>;
  /** Custom CSS that will be applied on all static pages of the publication. */
  static?: Maybe<Scalars['String']['output']>;
  /** The same as `static` but minified. */
  staticMinified?: Maybe<Scalars['String']['output']>;
};

export type CustomCssFeature = Feature & {
  __typename?: 'CustomCSSFeature';
  /** CSS that is not published yet. */
  draft?: Maybe<CustomCss>;
  /** A flag indicating if the custom CSS feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
  /** CSS that is live. */
  published?: Maybe<CustomCss>;
};

export enum CustomDomainStatus {
  Invalid = 'INVALID',
  Valid = 'VALID',
  Verifying = 'VERIFYING'
}

/** Contains the publication's dark mode preferences. */
export type DarkModePreferences = {
  __typename?: 'DarkModePreferences';
  /** A flag indicating if the dark mode is enabled for the publication. */
  enabled?: Maybe<Scalars['Boolean']['output']>;
  /** The custom dark mode logo of the publication. */
  logo?: Maybe<Scalars['String']['output']>;
};

/** Input to delete a role based invite. */
export type DeleteRoleBasedInviteInput = {
  /** The ID of the role based invite. */
  inviteId: Scalars['ID']['input'];
  publicationId: Scalars['ID']['input'];
};

/** Response to deleting a role based invite. */
export type DeleteRoleBasedInvitePayload = {
  __typename?: 'DeleteRoleBasedInvitePayload';
  /** Deleted invite. */
  invite: RoleBasedInvite;
};

export type DeleteWebhookPayload = {
  __typename?: 'DeleteWebhookPayload';
  webhook?: Maybe<Webhook>;
};

export enum DeviceType {
  Desktop = 'DESKTOP',
  Laptop = 'LAPTOP',
  Mobile = 'MOBILE',
  Tablet = 'TABLET'
}

/** Contains the publication's domain information. */
export type DomainInfo = {
  __typename?: 'DomainInfo';
  /** The domain of the publication. */
  domain?: Maybe<DomainStatus>;
  /**
   * The subdomain of the publication on hashnode.dev.
   *
   * It will redirect to you custom domain if it is present and ready.
   */
  hashnodeSubdomain?: Maybe<Scalars['String']['output']>;
  /** The www prefixed domain of the publication. Says if redirect to www domain is configured. */
  wwwPrefixedDomain?: Maybe<DomainStatus>;
};

/** Contains the publication's domain status. */
export type DomainStatus = {
  __typename?: 'DomainStatus';
  /** The host of the publication domain. */
  host: Scalars['String']['output'];
  /** A flag indicating if the publication domain is ready. */
  ready: Scalars['Boolean']['output'];
  /** A flag indicating the status of a publication domain */
  status: CustomDomainStatus;
  /**
   * A timestamp indicating when the domain was verified.
   * It is only present if the domain is verified.
   */
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
};

/**
 * Contains basic information about the draft.
 * A draft is a post that is not published yet.
 */
export type Draft = Node & {
  __typename?: 'Draft';
  /** The author of the draft. */
  author: User;
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  /**
   * Returns the user details of the co-authors of the post.
   *
   * Only available for team publications.
   */
  coAuthors?: Maybe<Array<User>>;
  /** Content of the draft in HTML and markdown */
  content?: Maybe<Content>;
  /** The cover image preference of the draft. Contains cover image URL and other details. */
  coverImage?: Maybe<DraftCoverImage>;
  /**
   * The date the draft was updated.
   * @deprecated Use updatedAt instead. Will be removed on 26/12/2023.
   */
  dateUpdated: Scalars['DateTime']['output'];
  /** Draft feature-related fields. */
  features: DraftFeatures;
  /** The ID of the draft. */
  id: Scalars['ID']['output'];
  /**
   * Whether or not the draft has been submitted for review.
   *
   * Only applicable to drafts in team publications.
   */
  isSubmittedForReview?: Maybe<Scalars['Boolean']['output']>;
  /** Information about the last backup of the draft. */
  lastBackup?: Maybe<DraftBackup>;
  /** The date the draft last failed to back up. */
  lastFailedBackupAt?: Maybe<Scalars['DateTime']['output']>;
  /** The date the draft was last successfully backed up. */
  lastSuccessfulBackupAt?: Maybe<Scalars['DateTime']['output']>;
  /** OG meta-data of the draft. Contains image url used in open graph meta tags. */
  ogMetaData?: Maybe<OpenGraphMetaData>;
  /** The publication the draft belongs to. */
  publication?: Maybe<Publication>;
  publishAs?: Maybe<User>;
  readTimeInMinutes: Scalars['Int']['output'];
  /** The date the draft is scheduled to be published. */
  scheduledDate?: Maybe<Scalars['DateTime']['output']>;
  /** SEO information of the draft. Contains title and description used in meta tags. */
  seo?: Maybe<Seo>;
  /** Information of the series the draft belongs to. */
  series?: Maybe<Series>;
  settings: DraftSettings;
  slug: Scalars['String']['output'];
  /** The subtitle of the draft. It would become the subtitle of the post when published. */
  subtitle?: Maybe<Scalars['String']['output']>;
  /**
   * Returns list of tags added to the draft. Contains tag id, name, slug, etc.
   * @deprecated Use tagsV2 instead. Will be removed on 26/02/2024.
   */
  tags: Array<Tag>;
  tagsV2: Array<DraftTag>;
  /** The title of the draft. It would become the title of the post when published. */
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DraftBackup = {
  __typename?: 'DraftBackup';
  /** The date the backup was created. */
  at?: Maybe<Scalars['DateTime']['output']>;
  /** The status of the backup i.e., success or failure. */
  status?: Maybe<BackupStatus>;
};

/**
 * Contains basic information about a Tag within a Draft.
 * A tag in a draft is a tag that is not published yet.
 */
export type DraftBaseTag = {
  __typename?: 'DraftBaseTag';
  /** The name of the tag. Shown in tag page. */
  name: Scalars['String']['output'];
  /** The slug of the tag. Used to access tags feed.  Example https://hashnode.com/n/graphql */
  slug: Scalars['String']['output'];
};

/**
 * Connection to get list of drafts.
 * Returns a list of edges which contains the draft and cursor to the last item of the previous page.
 */
export type DraftConnection = Connection & {
  __typename?: 'DraftConnection';
  /** A list of edges of drafts connection. */
  edges: Array<DraftEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/** Contains information about the cover image of the draft. */
export type DraftCoverImage = {
  __typename?: 'DraftCoverImage';
  /** Provides attribution information for the cover image, if available. */
  attribution?: Maybe<Scalars['String']['output']>;
  /** True if the image attribution should be hidden. */
  isAttributionHidden: Scalars['Boolean']['output'];
  /** The name of the photographer who captured the cover image. */
  photographer?: Maybe<Scalars['String']['output']>;
  /** The URL of the cover image. */
  url: Scalars['String']['output'];
};

/** An edge that contains a node of type draft and cursor to the node. */
export type DraftEdge = Edge & {
  __typename?: 'DraftEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** A node in the connection containing a draft. */
  node: Draft;
};

export type DraftFeatures = {
  __typename?: 'DraftFeatures';
  tableOfContents: TableOfContentsFeature;
};

export type DraftRevision = Node & {
  __typename?: 'DraftRevision';
  /** The name of the user who created the revision. */
  authorName: Scalars['String']['output'];
  /** The content of the draft revision. */
  content: Content;
  /** The time the revision has been created. */
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the draft revision. */
  id: Scalars['ID']['output'];
};

export type DraftRevisionEdge = Edge & {
  __typename?: 'DraftRevisionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** A node in the connection containing a draft revision. */
  node: DraftRevision;
};

export type DraftSettings = {
  __typename?: 'DraftSettings';
  /** A flag to indicate if the comments are disabled for the post. */
  disableComments: Scalars['Boolean']['output'];
  /** Whether or not the post is hidden from the Hashnode community. */
  isDelisted: Scalars['Boolean']['output'];
  /** A flag to indicate if the cover image is shown below title of the post. Default position of cover is top of title. */
  stickCoverToBottom: Scalars['Boolean']['output'];
};

export type DraftTag = DraftBaseTag | Tag;

/**
 * An edge that contains a node and cursor to the node.
 * This is a common interface for all edges.
 */
export type Edge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** A node in the connection. */
  node: Node;
};

/** The input for the email import acknowledgement mutation. */
export type EmailCurrentImport = {
  __typename?: 'EmailCurrentImport';
  /** The number of subscribers that have attempted to import */
  attemptedToImport?: Maybe<Scalars['Int']['output']>;
  /** The filename of the csv file containing emails */
  filename?: Maybe<Scalars['String']['output']>;
  /** The date the import started */
  importStartedAt: Scalars['DateTime']['output'];
  /** The status of the import */
  status: EmailImportStatus;
  /** The number of subscribers that have been successfully imported */
  successfullyImported?: Maybe<Scalars['Int']['output']>;
};

/** Contains information about the email import. */
export type EmailImport = {
  __typename?: 'EmailImport';
  /** Contains information about the current import example if it is in progress or has finished, date started, etc */
  currentImport?: Maybe<EmailCurrentImport>;
};

/** The status of the email import. */
export enum EmailImportStatus {
  /** There was an error during the import. */
  Failed = 'FAILED',
  /** The import has been acknowledged by the user. */
  Finished = 'FINISHED',
  /** Import has been initialized but is not yet in progress. */
  Initialized = 'INITIALIZED',
  /** Import is in progress. */
  InProgress = 'IN_PROGRESS',
  /** Import has to be reviewed by Hashnode. It is not yet reviewed. */
  InReview = 'IN_REVIEW',
  /** The has been rejected. Nothing has been imported. */
  Rejected = 'REJECTED',
  /** Import was successful. New emails have been imported. */
  Success = 'SUCCESS'
}

/** Invitations that failed to be sent to the user */
export type FailedInvite = {
  __typename?: 'FailedInvite';
  /** The email of the user that failed to invite. */
  email?: Maybe<Scalars['String']['output']>;
  /** The reason why the user failed to invite. */
  errorMessage: Scalars['String']['output'];
  /** The username of the user that failed to invite. */
  username?: Maybe<Scalars['String']['output']>;
};

/** Common fields that describe a feature. */
export type Feature = {
  /** Whether the feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
};

export type FeedFilter = {
  /** Adds a filter to return posts with maximum number of minutes required to read the post. */
  maxReadTime?: InputMaybe<Scalars['Int']['input']>;
  /** Adds a filter to return posts with minimum number of minutes required to read the post. */
  minReadTime?: InputMaybe<Scalars['Int']['input']>;
  /** Adds a filter to return posts with tagged with provided tags only. */
  tags?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
  /** The type of feed to be returned. */
  type?: InputMaybe<FeedType>;
};

/**
 * Connection for posts within a feed. Contains a list of edges containing nodes.
 * Each node is a post.
 * Page info contains information about pagination like hasNextPage and endCursor.
 */
export type FeedPostConnection = Connection & {
  __typename?: 'FeedPostConnection';
  /** A list of edges containing Post information */
  edges: Array<PostEdge>;
  /** Information for pagination in Post connection. */
  pageInfo: PageInfo;
};

/** Contains information about type of feed to be returned. */
export enum FeedType {
  /** Returns posts which were bookmarked by the user, sorted based on recency. */
  Bookmarks = 'BOOKMARKS',
  /** Returns posts which were featured, sorted based on recency. */
  Featured = 'FEATURED',
  /**
   * Returns only posts of the users you follow or publications you have subscribed to.
   *
   * Note: You have to be authenticated to use this feed type.
   */
  Following = 'FOLLOWING',
  /**
   * Returns only posts based on users following and interactions.
   *
   * Personalised feed is curated per requesting user basis.
   */
  Personalized = 'PERSONALIZED',
  /** Returns posts which were viewed by the user, sorted based on recency. */
  ReadingHistory = 'READING_HISTORY',
  /** Returns posts which were published recently, sorted based on recency. */
  Recent = 'RECENT',
  /** Returns posts based on old personalization algorithm. */
  Relevant = 'RELEVANT'
}

export type GptBotCrawlingFeature = Feature & {
  __typename?: 'GPTBotCrawlingFeature';
  /** A flag indicating if the GPT Bot Crawler feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
};

/** Views implementation that will be returned if grouping by browser. */
export type GroupedByBrowserViews = Node & Views & {
  __typename?: 'GroupedByBrowserViews';
  /** The browser that these views belong to. */
  browser: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if grouping by browser. */
export type GroupedByBrowserVisitors = Node & Visitors & {
  __typename?: 'GroupedByBrowserVisitors';
  /** The browser that these views belong to. */
  browser: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

/** Views implementation that will be returned if grouping by country. */
export type GroupedByCountryViews = Node & Views & {
  __typename?: 'GroupedByCountryViews';
  /** The country that these views belong to. */
  country: CountryCodeAlpha2;
  id: Scalars['ID']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if grouping by country. */
export type GroupedByCountryVisitors = Node & Visitors & {
  __typename?: 'GroupedByCountryVisitors';
  /** The country that these views belong to. */
  country: CountryCodeAlpha2;
  id: Scalars['ID']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

/** Views implementation that will be returned if grouping by device type. */
export type GroupedByDeviceTypeViews = Node & Views & {
  __typename?: 'GroupedByDeviceTypeViews';
  /** The type of device that these views belong to. */
  deviceType: DeviceType;
  id: Scalars['ID']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if grouping by device type. */
export type GroupedByDeviceTypeVisitors = Node & Visitors & {
  __typename?: 'GroupedByDeviceTypeVisitors';
  /** The type of device that these views belong to. */
  deviceType: DeviceType;
  id: Scalars['ID']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

/** Views implementation that will be returned if grouping by operating system. */
export type GroupedByOperatingSystemViews = Node & Views & {
  __typename?: 'GroupedByOperatingSystemViews';
  id: Scalars['ID']['output'];
  /** The operating system that these views belong to. */
  operatingSystem: Scalars['String']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if grouping by operating system. */
export type GroupedByOperatingSystemVisitors = Node & Visitors & {
  __typename?: 'GroupedByOperatingSystemVisitors';
  id: Scalars['ID']['output'];
  /** The operating system that these views belong to. */
  operatingSystem: Scalars['String']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

/** Views implementation that will be returned if grouping by page. */
export type GroupedByPageViews = Node & Views & {
  __typename?: 'GroupedByPageViews';
  id: Scalars['ID']['output'];
  /** The page that these views belong to. */
  page: StaticPage;
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if grouping by page. */
export type GroupedByPageVisitors = Node & Visitors & {
  __typename?: 'GroupedByPageVisitors';
  id: Scalars['ID']['output'];
  /** The page that these views belong to. */
  page: StaticPage;
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

/** Views implementation that will be returned if grouping by path. */
export type GroupedByPathViews = Node & Views & {
  __typename?: 'GroupedByPathViews';
  id: Scalars['ID']['output'];
  /** The path that these views belong to. */
  path: Scalars['String']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if grouping by path. */
export type GroupedByPathVisitors = Node & Visitors & {
  __typename?: 'GroupedByPathVisitors';
  id: Scalars['ID']['output'];
  /** The path that these views belong to. */
  path: Scalars['String']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

/** Views implementation that will be returned if grouping by post. */
export type GroupedByPostViews = Node & Views & {
  __typename?: 'GroupedByPostViews';
  id: Scalars['ID']['output'];
  /** The post that these views belong to. */
  post: Post;
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if grouping by post. */
export type GroupedByPostVisitors = Node & Visitors & {
  __typename?: 'GroupedByPostVisitors';
  id: Scalars['ID']['output'];
  /** The post that these views belong to. */
  post: Post;
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

/** Views implementation that will be returned if grouping by `REFERRER_HOST` dimension. */
export type GroupedByReferrerHostViews = Node & Views & {
  __typename?: 'GroupedByReferrerHostViews';
  id: Scalars['ID']['output'];
  /** The referrer host that these views belong to. */
  referrerHost: Scalars['String']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if grouping by `REFERRER_HOST` dimension. */
export type GroupedByReferrerHostVisitors = Node & Visitors & {
  __typename?: 'GroupedByReferrerHostVisitors';
  id: Scalars['ID']['output'];
  /** The referrer host that these views belong to. */
  referrerHost: Scalars['String']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

export type GroupedByTimeViews = Node & Views & {
  __typename?: 'GroupedByTimeViews';
  /** The start of the time range that these views belong to. */
  from: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** The end of the time range that these views belong to. */
  to: Scalars['DateTime']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if a grouping by time is provided. */
export type GroupedByTimeVisitors = Node & Visitors & {
  __typename?: 'GroupedByTimeVisitors';
  /** The start of the time range that these visitors visited the page. */
  from: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** The end of the time range that these visitors visited the page. */
  to: Scalars['DateTime']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

export type HeadlessCmsFeature = Feature & {
  __typename?: 'HeadlessCMSFeature';
  /** A flag indicating if the Headless CMS feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
};

export enum HttpRedirectionType {
  /** A permanent redirect that corresponds to the 302 HTTP status code. */
  Permanent = 'PERMANENT',
  /** A temporary redirect that corresponds to the 301 HTTP status code. */
  Temporary = 'TEMPORARY'
}

/**
 * Contains basic information about the tag.
 * A tag is a label that categorizes posts with similar topics.
 */
export type ITag = {
  /** Total number of users following this tag. */
  followersCount: Scalars['Int']['output'];
  /** The ID of the tag. */
  id: Scalars['ID']['output'];
  /** Information about the tag. Contains markdown html and text version of the tag's info. */
  info?: Maybe<Content>;
  /** The logo of the tag. Shown in tag page. */
  logo?: Maybe<Scalars['String']['output']>;
  /** The name of the tag. Shown in tag page. */
  name: Scalars['String']['output'];
  /** Alltime usage count of this tag in posts. */
  postsCount: Scalars['Int']['output'];
  /** The slug of the tag. Used to access tags feed.  Example https://hashnode.com/n/graphql */
  slug: Scalars['String']['output'];
  /** The tagline of the tag. */
  tagline?: Maybe<Scalars['String']['output']>;
};

/** Basic information about a user on Hashnode. */
export type IUser = {
  /** Whether or not the user is an ambassador. */
  ambassador: Scalars['Boolean']['output'];
  /** The availability of the user based on tech stack and interests. Shown on the "I am available for" section in user's profile. */
  availableFor?: Maybe<Scalars['String']['output']>;
  /** Returns a list of badges that the user has earned. Shown on blogs /badges page. Example - https://iamshadmirza.com/badges */
  badges: Array<Badge>;
  /** The bio of the user. Visible in about me section of the user's profile. */
  bio?: Maybe<Content>;
  /** The date the user joined Hashnode. */
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  /** Whether or not the user is deactivated. */
  deactivated: Scalars['Boolean']['output'];
  /** The users who are following this user */
  followers: UserConnection;
  /** The number of users that follow the requested user. Visible in the user's profile. */
  followersCount: Scalars['Int']['output'];
  /** The number of users that this user is following. Visible in the user's profile. */
  followingsCount: Scalars['Int']['output'];
  /** The users which this user is following */
  follows: UserConnection;
  /** The ID of the user. It can be used to identify the user. */
  id: Scalars['ID']['output'];
  /** The location of the user. */
  location?: Maybe<Scalars['String']['output']>;
  /** The name of the user. */
  name: Scalars['String']['output'];
  /** Returns the list of posts the user has published. */
  posts: UserPostConnection;
  /** The URL to the profile picture of the user. */
  profilePicture?: Maybe<Scalars['String']['output']>;
  /** Publications associated with the user. Includes personal and team publications. */
  publications: UserPublicationsConnection;
  /** The social media links of the user. Shown on the user's profile. */
  socialMediaLinks?: Maybe<SocialMediaLinks>;
  /** The tagline of the user. Shown on the user's profile below the name. */
  tagline?: Maybe<Scalars['String']['output']>;
  /** Returns a list of tags that the user follows. */
  tagsFollowing: Array<Tag>;
  /** The username of the user. It is unique and tied with user's profile URL. Example - https://hashnode.com/@username */
  username: Scalars['String']['output'];
};


/** Basic information about a user on Hashnode. */
export type IUserFollowersArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/** Basic information about a user on Hashnode. */
export type IUserFollowsArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/** Basic information about a user on Hashnode. */
export type IUserPostsArgs = {
  filter?: InputMaybe<UserPostConnectionFilter>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortBy?: InputMaybe<UserPostsSort>;
};


/** Basic information about a user on Hashnode. */
export type IUserPublicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<UserPublicationsConnectionFilter>;
  first: Scalars['Int']['input'];
};

/** Input to invite users to a publication. */
export type InviteUsersToPublicationInput = {
  /** The publication ID to invite users to. */
  publicationId: Scalars['ID']['input'];
  /** The list of users  to invite to the publication. */
  users: Array<UserInviteInput>;
};

/** Response to inviting users to a publication. */
export type InviteUsersToPublicationPayload = {
  __typename?: 'InviteUsersToPublicationPayload';
  /** Invites that failed due to an error. */
  failedInvites: Array<FailedInvite>;
  /** Signifies if the mutation was successful for all users. */
  success: Scalars['Boolean']['output'];
  /** The number of successful invites. */
  successfulInviteCount: Scalars['Int']['output'];
};

export type LikeCommentInput = {
  commentId: Scalars['ID']['input'];
  likesCount?: InputMaybe<Scalars['Int']['input']>;
};

export type LikeCommentPayload = {
  __typename?: 'LikeCommentPayload';
  comment?: Maybe<Comment>;
};

export type LikePostInput = {
  likesCount?: InputMaybe<Scalars['Int']['input']>;
  postId: Scalars['ID']['input'];
};

export type LikePostPayload = {
  __typename?: 'LikePostPayload';
  post?: Maybe<Post>;
};

export type LikeReplyInput = {
  commentId: Scalars['ID']['input'];
  likesCount?: InputMaybe<Scalars['Int']['input']>;
  replyId: Scalars['ID']['input'];
};

export type LikeReplyPayload = {
  __typename?: 'LikeReplyPayload';
  reply?: Maybe<Reply>;
};

/** Contains information about meta tags. Used for SEO purpose. */
export type MetaTagsInput = {
  /** The description of the post used in og:description for SEO. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The image URL of the post used in og:image for SEO. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** The title of the post used in og:title for SEO. */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accepts an invitation to join a publication. The user is added as a member of the publication. */
  acceptInviteToPublication: AcceptInviteToPublicationPayload;
  /** Accepts a role based invite and adds the user as a member of the publication. The user is assigned the role specified in the invite. */
  acceptRoleBasedInvite: AcceptRoleBasedInvitePayload;
  /** Adds a comment to a post. */
  addComment: AddCommentPayload;
  /** Adds a post to a series. */
  addPostToSeries: AddPostToSeriesPayload;
  /** Adds a reply to a comment. */
  addReply: AddReplyPayload;
  cancelScheduledDraft: CancelScheduledDraftPayload;
  /** Changes the role of a user in a publication. */
  changePublicationMemberRole: ChangePublicationMemberRolePayload;
  /**
   * Changes the privacy state of a user in a publication.
   * PRIVATE members are not visible on the members page while PUBLIC members are visible.
   */
  changePublicationMemberVisibility: ChangePublicationMemberVisibilityPayload;
  /** Creates a new draft for a post. */
  createDraft: CreateDraftPayload;
  createRedirectionRule: CreateRedirectionRulePayload;
  /** Creates a role based invite for a publication and returns a link to invite users to a publication. */
  createRoleBasedInviteForPublication: CreateRoleBasedInviteForPublicationPayload;
  /** Creates a new series. */
  createSeries: CreateSeriesPayload;
  createWebhook: CreateWebhookPayload;
  /** Deletes a role based invite. */
  deleteRoleBasedInvite: DeleteRoleBasedInvitePayload;
  deleteWebhook: DeleteWebhookPayload;
  /** Invites users to a publication. Either by username or email. */
  inviteUsersToPublication: InviteUsersToPublicationPayload;
  /** Likes a comment. */
  likeComment: LikeCommentPayload;
  /** Likes a post. */
  likePost: LikePostPayload;
  /** Likes a reply. */
  likeReply: LikeReplyPayload;
  /** Publishes an existing draft as a post. */
  publishDraft: PublishDraftPayload;
  /** Creates a new post. */
  publishPost: PublishPostPayload;
  recommendPublications: RecommendPublicationsPayload;
  /** Resends an invitation to a user to join a publication. The user must have been previously invited. Sends an email to the user. */
  reinviteUserToPublication: ReinviteUserToPublicationPayload;
  /** Removes a comment from a post. */
  removeComment: RemoveCommentPayload;
  /** Removes a post. */
  removePost: RemovePostPayload;
  /** Removes a user from a teams publication. */
  removePublicationMember: RemovePublicationMemberPayload;
  removeRecommendation: RemoveRecommendationPayload;
  removeRedirectionRule: RemoveRedirectionRulePayload;
  /** Removes a reply from a comment. */
  removeReply: RemoveReplyPayload;
  /** Removes a series. */
  removeSeries: RemoveSeriesPayload;
  /** Reschedule a draft. */
  rescheduleDraft: RescheduleDraftPayload;
  resendWebhookRequest: ResendWebhookRequestPayload;
  /** Restores a deleted post. */
  restorePost: RestorePostPayload;
  /** Revokes a user invitation that was sent to join a publication. */
  revokeUserInviteToPublication: RevokeUserInviteToPublicationPayload;
  scheduleDraft: ScheduleDraftPayload;
  subscribeToNewsletter: SubscribeToNewsletterPayload;
  /** Toggle allowContributorEdits flag to allow or restrict external contributors to further edit published articles. */
  toggleAllowContributorEdits: ToggleAllowContributorEditsPayload;
  /**
   * Update the follow state for the user that is provided via id or username.
   * If the authenticated user does not follow the user, the mutation will follow the user.
   * If the authenticated user already follows the user, the mutation will un-follow the user.
   * Only available to the authenticated user.
   */
  toggleFollowUser: ToggleFollowUserPayload;
  /** Toggle GPT bot crawling feature. */
  toggleGPTBotCrawling: ToggleGptBotCrawlingPayload;
  /** Toggles role based invite links' active status. Users can join the publication by the invite link only if it is active. */
  toggleRoleBasedInviteLinks: ToggleRoleBasedInviteLinksPayload;
  /** Toggle text selection sharer feature. */
  toggleTextSelectionSharer: ToggleTextSelectionSharerPayload;
  triggerWebhookTest: TriggerWebhookTestPayload;
  unsubscribeFromNewsletter: UnsubscribeFromNewsletterPayload;
  /** Updates a comment on a post. */
  updateComment: UpdateCommentPayload;
  updatePost: UpdatePostPayload;
  updateRedirectionRule: UpdateRedirectionRulePayload;
  /** Updates a reply */
  updateReply: UpdateReplyPayload;
  /** Updates a role based invite for a publication. */
  updateRoleBasedInvite: UpdateRoleBasedInvitePayload;
  /** Updates a series. */
  updateSeries: UpdateSeriesPayload;
  updateWebhook: UpdateWebhookPayload;
};


export type MutationAcceptInviteToPublicationArgs = {
  input: AcceptInviteToPublicationInput;
};


export type MutationAcceptRoleBasedInviteArgs = {
  input: AcceptRoleBasedInviteInput;
};


export type MutationAddCommentArgs = {
  input: AddCommentInput;
};


export type MutationAddPostToSeriesArgs = {
  input: AddPostToSeriesInput;
};


export type MutationAddReplyArgs = {
  input: AddReplyInput;
};


export type MutationCancelScheduledDraftArgs = {
  input: CancelScheduledDraftInput;
};


export type MutationChangePublicationMemberRoleArgs = {
  input: ChangePublicationMemberRoleInput;
};


export type MutationChangePublicationMemberVisibilityArgs = {
  input: ChangePublicationMemberVisibilityInput;
};


export type MutationCreateDraftArgs = {
  input: CreateDraftInput;
};


export type MutationCreateRedirectionRuleArgs = {
  input: CreateRedirectionRuleInput;
};


export type MutationCreateRoleBasedInviteForPublicationArgs = {
  input: CreateRoleBasedInviteForPublicationInput;
};


export type MutationCreateSeriesArgs = {
  input: CreateSeriesInput;
};


export type MutationCreateWebhookArgs = {
  input: CreateWebhookInput;
};


export type MutationDeleteRoleBasedInviteArgs = {
  input: DeleteRoleBasedInviteInput;
};


export type MutationDeleteWebhookArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInviteUsersToPublicationArgs = {
  input: InviteUsersToPublicationInput;
};


export type MutationLikeCommentArgs = {
  input: LikeCommentInput;
};


export type MutationLikePostArgs = {
  input: LikePostInput;
};


export type MutationLikeReplyArgs = {
  input: LikeReplyInput;
};


export type MutationPublishDraftArgs = {
  input: PublishDraftInput;
};


export type MutationPublishPostArgs = {
  input: PublishPostInput;
};


export type MutationRecommendPublicationsArgs = {
  input: RecommendPublicationsInput;
};


export type MutationReinviteUserToPublicationArgs = {
  input: ReinviteUserToPublicationInput;
};


export type MutationRemoveCommentArgs = {
  input: RemoveCommentInput;
};


export type MutationRemovePostArgs = {
  input: RemovePostInput;
};


export type MutationRemovePublicationMemberArgs = {
  input: RemovePublicationMemberInput;
};


export type MutationRemoveRecommendationArgs = {
  input: RemoveRecommendationInput;
};


export type MutationRemoveRedirectionRuleArgs = {
  input: RemoveRedirectionRuleInput;
};


export type MutationRemoveReplyArgs = {
  input: RemoveReplyInput;
};


export type MutationRemoveSeriesArgs = {
  input: RemoveSeriesInput;
};


export type MutationRescheduleDraftArgs = {
  input: RescheduleDraftInput;
};


export type MutationResendWebhookRequestArgs = {
  input: ResendWebhookRequestInput;
};


export type MutationRestorePostArgs = {
  input: RestorePostInput;
};


export type MutationRevokeUserInviteToPublicationArgs = {
  input: RevokeUserInviteToPublicationInput;
};


export type MutationScheduleDraftArgs = {
  input: ScheduleDraftInput;
};


export type MutationSubscribeToNewsletterArgs = {
  input: SubscribeToNewsletterInput;
};


export type MutationToggleAllowContributorEditsArgs = {
  input: ToggleAllowContributorEditsInput;
};


export type MutationToggleFollowUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationToggleGptBotCrawlingArgs = {
  input: ToggleGptBotCrawlingInput;
};


export type MutationToggleRoleBasedInviteLinksArgs = {
  publicationId: Scalars['ID']['input'];
};


export type MutationToggleTextSelectionSharerArgs = {
  input: ToggleTextSelectionSharerInput;
};


export type MutationTriggerWebhookTestArgs = {
  input: TriggerWebhookTestInput;
};


export type MutationUnsubscribeFromNewsletterArgs = {
  input: UnsubscribeFromNewsletterInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateRedirectionRuleArgs = {
  input: UpdateRedirectionRuleInput;
};


export type MutationUpdateReplyArgs = {
  input: UpdateReplyInput;
};


export type MutationUpdateRoleBasedInviteArgs = {
  input: UpdateRoleBasedInviteInput;
};


export type MutationUpdateSeriesArgs = {
  input: UpdateSeriesInput;
};


export type MutationUpdateWebhookArgs = {
  input: UpdateWebhookInput;
};

/**
 * Basic information about the authenticated user.
 * User must be authenticated to use this type.
 */
export type MyUser = IUser & Node & {
  __typename?: 'MyUser';
  /**
   * Whether or not the user is an ambassador.
   * @deprecated Ambassadors program no longer active. Will be removed after 02/01/2024
   */
  ambassador: Scalars['Boolean']['output'];
  /** The availability of the user based on tech stack and interests. Shown on the "I am available for" section in user's profile. */
  availableFor?: Maybe<Scalars['String']['output']>;
  /** Returns a list of badges that the user has earned. Shown on blogs /badges page. Example - https://iamshadmirza.com/badges */
  badges: Array<Badge>;
  /** A list of beta features that the user has access to. Only available to the authenticated user. */
  betaFeatures: Array<BetaFeature>;
  /** The bio of the user. Visible in about me section of the user's profile. */
  bio?: Maybe<Content>;
  /** The date the user joined Hashnode. */
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  /** Whether or not the user is deactivated. */
  deactivated: Scalars['Boolean']['output'];
  drafts: UserDraftConnection;
  /** Email address of the user. Only available to the authenticated user. */
  email: Scalars['String']['output'];
  /** The users who are following this user */
  followers: UserConnection;
  /** The number of users that follow the requested user. Visible in the user's profile. */
  followersCount: Scalars['Int']['output'];
  /** The number of users that this user is following. Visible in the user's profile. */
  followingsCount: Scalars['Int']['output'];
  /** The users which this user is following */
  follows: UserConnection;
  /** The ID of the user. It can be used to identify the user. */
  id: Scalars['ID']['output'];
  /** The location of the user. */
  location?: Maybe<Scalars['String']['output']>;
  /** The name of the user. */
  name: Scalars['String']['output'];
  /** Returns the list of posts the user has published. */
  posts: UserPostConnection;
  /** The URL to the profile picture of the user. */
  profilePicture?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  /** Publications associated with the user. Includes personal and team publications. */
  publications: UserPublicationsConnection;
  /** Returns the user's role if any. */
  role: UserRole;
  /** The social media links of the user. Shown on the user's profile. */
  socialMediaLinks?: Maybe<SocialMediaLinks>;
  /** The tagline of the user. Shown on the user's profile below the name. */
  tagline?: Maybe<Scalars['String']['output']>;
  /** Returns a list of tags that the user follows. */
  tagsFollowing: Array<Tag>;
  /** The username of the user. It is unique and tied with user's profile URL. Example - https://hashnode.com/@username */
  username: Scalars['String']['output'];
};


/**
 * Basic information about the authenticated user.
 * User must be authenticated to use this type.
 */
export type MyUserDraftsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


/**
 * Basic information about the authenticated user.
 * User must be authenticated to use this type.
 */
export type MyUserFollowersArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/**
 * Basic information about the authenticated user.
 * User must be authenticated to use this type.
 */
export type MyUserFollowsArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/**
 * Basic information about the authenticated user.
 * User must be authenticated to use this type.
 */
export type MyUserPostsArgs = {
  filter?: InputMaybe<UserPostConnectionFilter>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortBy?: InputMaybe<UserPostsSort>;
};


/**
 * Basic information about the authenticated user.
 * User must be authenticated to use this type.
 */
export type MyUserPublicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<UserPublicationsConnectionFilter>;
  first: Scalars['Int']['input'];
};

/**
 * Contains the flag indicating if the newsletter feature is enabled or not.
 * User can enable or disable the newsletter feature from the publication settings.
 * Shows a newsletter prompt on blog if enabled.
 */
export type NewsletterFeature = Feature & {
  __typename?: 'NewsletterFeature';
  frequency?: Maybe<NewsletterFrequency>;
  /** A flag indicating if the newsletter feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
};

export enum NewsletterFrequency {
  Asap = 'asap',
  Weekly = 'weekly'
}

export type NewsletterRecord = Node & {
  __typename?: 'NewsletterRecord';
  /** The number of subscribers the newsletter was clicked by. */
  clickCount: Scalars['Int']['output'];
  /** Delivery ID of the sent newsletter */
  id: Scalars['ID']['output'];
  /** The number of subscribers the newsletter was opened by. */
  openCount: Scalars['Int']['output'];
  /** Associated post it was sent with */
  post?: Maybe<Post>;
  /** The date the newsletter was sent. */
  sentAt: Scalars['DateTime']['output'];
  /** The number of subscribers the newsletter was sent to. */
  sentCount: Scalars['Int']['output'];
};

export enum NewsletterSubscribeStatus {
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type NewsletterSubscriber = Node & {
  __typename?: 'NewsletterSubscriber';
  /**
   * The date the subscriber was added.
   * @deprecated Use `subscribedAt` instead. Will be removed after 12/4/2024
   */
  createdAt: Scalars['DateTime']['output'];
  /** The email of the subscriber. */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The status of the subscriber. */
  status: NewsletterSubscribeStatus;
  subscribedAt: Scalars['DateTime']['output'];
};

export enum NewsletterUnsubscribeStatus {
  Unsubscribed = 'UNSUBSCRIBED'
}

/** Node is a common interface for all types example User, Post, Comment, etc. */
export type Node = {
  /** The ID of the node. */
  id: Scalars['ID']['output'];
};

/** Contains information to help in pagination for page based pagination. */
export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  /** Indicates if there are more pages. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** Indicates if there are previous pages */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  /**
   * The page after the current page.
   * Use it to build page navigation
   */
  nextPage?: Maybe<Scalars['Int']['output']>;
  /**
   * The page before the current page.
   * Use it to build page navigation
   */
  previousPage?: Maybe<Scalars['Int']['output']>;
};

/** Information to help in open graph related meta tags. */
export type OpenGraphMetaData = {
  __typename?: 'OpenGraphMetaData';
  /** The image used in og:image tag for SEO purposes. */
  image?: Maybe<Scalars['String']['output']>;
};

/**
 * A Connection for page based pagination to get a list of items.
 * Returns a list of nodes which contains the items.
 * This is a common interface for all page connections.
 */
export type PageConnection = {
  /** A list of edges of items connection. */
  nodes: Array<Node>;
  /** Information to aid in pagination. */
  pageInfo: OffsetPageInfo;
};

/** Contains information to help in pagination. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /**
   * The cursor of the last item in the current page.
   * Use it as the after input to query the next page.
   */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates if there are more pages. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
};

/**
 * Contains the preferences publication's autogenerated pages.
 * Used to enable or disable pages like badge, newsletter and members.
 */
export type PagesPreferences = {
  __typename?: 'PagesPreferences';
  /** A flag indicating if the publication's badge page is enabled. */
  badges?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating if the publication's member page is enabled. */
  members?: Maybe<Scalars['Boolean']['output']>;
  /** A flag indicating if the publication's newsletter page is enabled. */
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

/** Contains the pending invite information. */
export type PendingInvite = Node & {
  __typename?: 'PendingInvite';
  /** The email of the user that was invited. */
  email?: Maybe<Scalars['String']['output']>;
  /** The ID of the pending invite. */
  id: Scalars['ID']['output'];
  /** The role assigned to the user in the publication. */
  role: UserPublicationRole;
  /** Invited Hashnode user, returns null if the user is not a Hashnode user. */
  user?: Maybe<User>;
};

export type PendingInviteConnection = PageConnection & {
  __typename?: 'PendingInviteConnection';
  /** A list of invites */
  nodes: Array<PendingInvite>;
  /** Information to aid in pagination. */
  pageInfo: OffsetPageInfo;
  /** The total number of invites. */
  totalDocuments: Scalars['Int']['output'];
};

/** Contains basic information about the tag returned by popularTags query. */
export type PopularTag = ITag & Node & {
  __typename?: 'PopularTag';
  /** Total number of users following this tag. */
  followersCount: Scalars['Int']['output'];
  /** The ID of the tag. */
  id: Scalars['ID']['output'];
  /** Information about the tag. Contains markdown html and text version of the tag's info. */
  info?: Maybe<Content>;
  /** The logo of the tag. Shown in tag page. */
  logo?: Maybe<Scalars['String']['output']>;
  /** The name of the tag. Shown in tag page. */
  name: Scalars['String']['output'];
  /** Alltime usage count of this tag in posts. */
  postsCount: Scalars['Int']['output'];
  /** The number of posts published in the given period that use this tag. */
  postsCountInPeriod: Scalars['Int']['output'];
  /** The slug of the tag. Used to access tags feed.  Example https://hashnode.com/n/graphql */
  slug: Scalars['String']['output'];
  /** The tagline of the tag. */
  tagline?: Maybe<Scalars['String']['output']>;
};

/** Contains a tag and a cursor for pagination. */
export type PopularTagEdge = Edge & {
  __typename?: 'PopularTagEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The node holding the Tag information */
  node: PopularTag;
};

/**
 * Contains basic information about the post.
 * A post is a published article on Hashnode.
 */
export type Post = Node & {
  __typename?: 'Post';
  /**
   * Returns male and female audio url of the post. Available in case the Audioblog is enabled.
   * @deprecated Audio Blogs are not supported anymore. This field will be removed 18/04/23
   */
  audioUrls?: Maybe<AudioUrls>;
  /** Returns the user details of the author of the post. */
  author: User;
  /**
   * Flag to indicate if the post is bookmarked by the requesting user.
   *
   * Returns `false` if the user is not authenticated.
   */
  bookmarked: Scalars['Boolean']['output'];
  /** Brief is a short description of the post extracted from the content of the post. It's 250 characters long sanitized string. */
  brief: Scalars['String']['output'];
  /** Canonical URL set by author in case of republished posts. */
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  /**
   * Returns the user details of the co-authors of the post.
   * Hashnode users can add up to 4 co-authors as collaborators to their posts.
   * This functionality is limited to teams publication.
   */
  coAuthors?: Maybe<Array<User>>;
  /** List of users who have commented on the post. */
  commenters: PostCommenterConnection;
  /** A list of comments on the post. */
  comments: PostCommentConnection;
  /** Content of the post. Contains HTML and Markdown version of the post content. */
  content: Content;
  /**
   * A list of contributors of the post. Contributors are users who have commented or replied to the post.
   * @deprecated Will be removed on 10th Oct 2023. Use `commenters` instead.
   */
  contributors: Array<User>;
  /** The cover image preference of the post. Contains cover image URL and other details. */
  coverImage?: Maybe<PostCoverImage>;
  /** Unique ID to identify post, used internally by hashnode. */
  cuid?: Maybe<Scalars['String']['output']>;
  /** Flag to indicate if the post is featured on Hashnode feed. */
  featured: Scalars['Boolean']['output'];
  /** The date and time the post was featured. Used along with featured flag to determine if the post is featured. */
  featuredAt?: Maybe<Scalars['DateTime']['output']>;
  /** Post feature-related fields. */
  features: PostFeatures;
  /** A flag to indicate if the post contains LaTeX. Latex is used to write mathematical equations. */
  hasLatexInPost: Scalars['Boolean']['output'];
  /** The ID of the post. Used to uniquely identify the post. */
  id: Scalars['ID']['output'];
  /** Whether or not the post has automatically been published via RSS feed. */
  isAutoPublishedFromRSS: Scalars['Boolean']['output'];
  /**
   * Whether or not the authenticated user is following this post.
   *
   * Returns `null` if the user is not authenticated.
   */
  isFollowed?: Maybe<Scalars['Boolean']['output']>;
  /** A list of users who liked the post. */
  likedBy: PostLikerConnection;
  /** OG meta-data of the post. Contains image url used in open graph meta tags. */
  ogMetaData?: Maybe<OpenGraphMetaData>;
  /** Preference settings for the post. Contains information about if the post is pinned to blog, comments are disabled, etc. */
  preferences: PostPreferences;
  /**
   * The previous slugs of the post. Only present if the slug has been changed.
   *
   * This could be used to create redirects for all posts from all previous slugs to the current slug.
   *
   * The latest slug is always the first element in the array.
   */
  previousSlugs: Array<Scalars['String']['output']>;
  /** The publication the post belongs to. */
  publication?: Maybe<Publication>;
  /** The date and time the post was published. */
  publishedAt: Scalars['DateTime']['output'];
  /** The number of hearts on the post. Shows how many users liked the post. */
  reactionCount: Scalars['Int']['output'];
  /** The estimated time to read the post in minutes. */
  readTimeInMinutes: Scalars['Int']['output'];
  /** The number of replies on the post. */
  replyCount: Scalars['Int']['output'];
  /** The number of comments on the post. */
  responseCount: Scalars['Int']['output'];
  /** SEO information of the post. Contains title and description used in meta tags. */
  seo?: Maybe<Seo>;
  /** Information of the series the post belongs to. */
  series?: Maybe<Series>;
  /** The slug of the post. Used as address of the post on blog. Example - https://johndoe.com/my-post-slug */
  slug: Scalars['String']['output'];
  /** Boolean flag to identify whether or not the post is sourced from GitHub. */
  sourcedFromGithub: Scalars['Boolean']['output'];
  /** The subtitle of the post. Subtitle is a short description of the post which is also used in SEO if meta tags are not provided. */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Returns list of tags added to the post. Contains tag id, name, slug, etc. */
  tags?: Maybe<Array<Tag>>;
  /** The title of the post. */
  title: Scalars['String']['output'];
  /** The date and time the post was last updated. */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Complete URL of the post including the domain name. Example - https://johndoe.com/my-post-slug */
  url: Scalars['String']['output'];
  /** The number of views on the post. Can be used to show the popularity of the post. */
  views: Scalars['Int']['output'];
};


/**
 * Contains basic information about the post.
 * A post is a published article on Hashnode.
 */
export type PostCommentersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  sortBy?: InputMaybe<PostCommenterSortBy>;
};


/**
 * Contains basic information about the post.
 * A post is a published article on Hashnode.
 */
export type PostCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  sortBy?: InputMaybe<PostCommentSortBy>;
};


/**
 * Contains basic information about the post.
 * A post is a published article on Hashnode.
 */
export type PostLikedByArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PostLikerFilter>;
  first: Scalars['Int']['input'];
};

/** The author type of a post from a user's perspective */
export enum PostAuthorType {
  /** The user has authored the post. */
  Author = 'AUTHOR',
  /** The user is a co-author of post. */
  CoAuthor = 'CO_AUTHOR'
}

export type PostBadge = Node & {
  __typename?: 'PostBadge';
  /** Unique identifier. */
  id: Scalars['ID']['output'];
  /** The type of the badge. */
  type: PostBadgeType;
};

export enum PostBadgeType {
  FeaturedDailyDotDev = 'FEATURED_DAILY_DOT_DEV',
  FeaturedHashnode = 'FEATURED_HASHNODE'
}

export type PostBadgesFeature = Feature & {
  __typename?: 'PostBadgesFeature';
  /** Whether or not the user has chosen to show badges on the post. */
  isEnabled: Scalars['Boolean']['output'];
  items: Array<PostBadge>;
};

/**
 * Connection for comments. Contains a list of edges containing nodes.
 * Each node holds a comment.
 * Page info contains information about pagination like hasNextPage and endCursor.
 * Total documents contains the total number of comments.
 */
export type PostCommentConnection = Connection & {
  __typename?: 'PostCommentConnection';
  /** A list of edges containing comments as nodes. */
  edges: Array<PostCommentEdge>;
  /** Information about pagination in a connection. */
  pageInfo: PageInfo;
  /** Total number of nodes available i.e. number of comments. */
  totalDocuments: Scalars['Int']['output'];
};

/** A comment on the post. Contains information about the content of the comment, user who commented, etc. */
export type PostCommentEdge = Edge & {
  __typename?: 'PostCommentEdge';
  /** The cursor for this node used for pagination. */
  cursor: Scalars['String']['output'];
  /** The comment on the post. */
  node: Comment;
};

/** Sorting options for comments. Used to sort comments by top or recent. */
export enum PostCommentSortBy {
  /** Sorts comments by recency. */
  Recent = 'RECENT',
  /** Sorts comments by popularity. */
  Top = 'TOP'
}

/**
 * Connection for commenters (users). Contains a list of edges containing nodes.
 * Each node holds commenter.
 * Page info contains information about pagination like hasNextPage and endCursor.
 * Total documents contains the total number of commenters.
 */
export type PostCommenterConnection = Connection & {
  __typename?: 'PostCommenterConnection';
  /** A list of edges containing commenters as nodes. */
  edges: Array<PostCommenterEdge>;
  /** Information about pagination in a connection. */
  pageInfo: PageInfo;
  /** Total number of nodes available i.e. number of commenters. */
  totalDocuments: Scalars['Int']['output'];
};

/** A commenter on the post. Contains information about the user who commented. */
export type PostCommenterEdge = Edge & {
  __typename?: 'PostCommenterEdge';
  /** The cursor for this node used for pagination. */
  cursor: Scalars['String']['output'];
  /** The commenter on the post. */
  node: User;
};

/** Sorting options for commenters. Used to sort commenters by popularity or recency. */
export enum PostCommenterSortBy {
  /** Sorts commenters by popularity. */
  Popular = 'POPULAR',
  /** Sorts commenters by recency. */
  Recent = 'RECENT'
}

/** Contains information about the cover image of the post. */
export type PostCoverImage = {
  __typename?: 'PostCoverImage';
  /** Provides attribution information for the cover image, if available. */
  attribution?: Maybe<Scalars['String']['output']>;
  /** True if the image attribution should be hidden. */
  isAttributionHidden: Scalars['Boolean']['output'];
  /** Indicates whether the cover image is in portrait orientation. */
  isPortrait: Scalars['Boolean']['output'];
  /** The name of the photographer who captured the cover image. */
  photographer?: Maybe<Scalars['String']['output']>;
  /** The URL of the cover image. */
  url: Scalars['String']['output'];
};

/** Contains a post and a cursor for pagination. */
export type PostEdge = Edge & {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The node holding the Post information */
  node: Post;
};

export type PostFeatures = {
  __typename?: 'PostFeatures';
  badges: PostBadgesFeature;
  tableOfContents: TableOfContentsFeature;
};

/**
 * Connection for users who liked the post. Contains a list of edges containing nodes.
 * Each node is a user who liked the post.
 * Page info contains information about pagination like hasNextPage and endCursor.
 * Total documents contains the total number of users who liked the post.
 */
export type PostLikerConnection = Connection & {
  __typename?: 'PostLikerConnection';
  /** A list of edges containing users as nodes */
  edges: Array<PostLikerEdge>;
  /** Information about pagination in a connection. */
  pageInfo: PageInfo;
  /** Total number of nodes available i.e. number of users who liked the post. */
  totalDocuments: Scalars['Int']['output'];
};

/** A user who liked the post. Contains information about the user and number of reactions added by the user. */
export type PostLikerEdge = Edge & {
  __typename?: 'PostLikerEdge';
  /** The cursor for this node used for pagination. */
  cursor: Scalars['String']['output'];
  /** The user who liked the post. */
  node: User;
  /** The number of reaction added by the user. */
  reactionCount: Scalars['Int']['output'];
};

export type PostLikerFilter = {
  /** Only return likes from users with the given user IDs. */
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Contains Post preferences. Used to determine if the post is pinned to blog, comments are disabled, or cover image is sticked to bottom. */
export type PostPreferences = {
  __typename?: 'PostPreferences';
  /** A flag to indicate if the comments are disabled for the post. */
  disableComments: Scalars['Boolean']['output'];
  /** Whether or not the post is hidden from the Hashnode community. */
  isDelisted: Scalars['Boolean']['output'];
  /** A flag to indicate if the post is pinned to blog. Pinned post is shown on top of the blog. */
  pinnedToBlog: Scalars['Boolean']['output'];
  /** A flag to indicate if the cover image is shown below title of the post. Default position of cover is top of title. */
  stickCoverToBottom: Scalars['Boolean']['output'];
};

/** Contains the publication's preferences for layout, theme and other personalisations. */
export type Preferences = {
  __typename?: 'Preferences';
  /** The publication's darkmode preferences. Can be used to load blog in dark mode by default and add a custom dark mode logo. */
  darkMode?: Maybe<DarkModePreferences>;
  /** A flag indicating if the hashnode's footer branding is disabled for the publication. */
  disableFooterBranding?: Maybe<Scalars['Boolean']['output']>;
  /** An object containing pages enabled for the publication. */
  enabledPages?: Maybe<PagesPreferences>;
  /** A flag indicating if subscription popup needs to be shown to be shown for the publication */
  isSubscriptionModalDisabled?: Maybe<Scalars['Boolean']['output']>;
  /** The selected publication's layout, can be stacked, grid or magazine. */
  layout?: Maybe<PublicationLayout>;
  /** The publication's logo url. */
  logo?: Maybe<Scalars['String']['output']>;
  /** The items in the publication's navigation bar. */
  navbarItems: Array<PublicationNavbarItem>;
};

export type ProTeamFeature = Feature & {
  __typename?: 'ProTeamFeature';
  /** A flag indicating if the Pro team feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
};

/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type Publication = Node & {
  __typename?: 'Publication';
  /** The about section of the publication. */
  about?: Maybe<Content>;
  /** Returns the list of drafts in the publication */
  allDrafts: DraftConnection;
  /** Returns all the scheduled drafts of the publication. */
  allScheduledDrafts: DraftConnection;
  /** Boolean flag indicating if the publication allows edits by contributors */
  allowContributorEdits: Scalars['Boolean']['output'];
  /** The author who owns the publication. */
  author: User;
  /** The canonical URL of the publication. */
  canonicalURL: Scalars['String']['output'];
  /** The description of the publication, used in og:description meta tag. Fall backs to Publication.about.text if no SEO description is provided. */
  descriptionSEO?: Maybe<Scalars['String']['output']>;
  /** The title of the publication. Shown in blog home page. */
  displayTitle?: Maybe<Scalars['String']['output']>;
  /** Domain information of the publication. */
  domainInfo: DomainInfo;
  /** Returns the list of drafts of the authenticated user in the publication. */
  drafts: DraftConnection;
  /** Returns the publication's email imports, used with newsletter feature. */
  emailImport?: Maybe<EmailImport>;
  /** The favicon of the publication. Used in browser tab. */
  favicon?: Maybe<Scalars['String']['output']>;
  /** Object containing information about beta features enabled for the publication. */
  features: PublicationFeatures;
  /** Total number of followers of the publication. */
  followersCount?: Maybe<Scalars['Int']['output']>;
  /** Whether the publication has earned any badges or not. */
  hasBadges: Scalars['Boolean']['output'];
  /** Color code of the header color of the publication. Used to style header of blog. */
  headerColor?: Maybe<Scalars['String']['output']>;
  /** The ID of the publication. */
  id: Scalars['ID']['output'];
  /**
   * Summary of the contact information and information related to copyrights, usually used in German-speaking countries.
   * @deprecated Use `imprintV2` instead. Will be removed after 16/12/2023.
   */
  imprint?: Maybe<Scalars['String']['output']>;
  /** Summary of the contact information and information related to copyrights, usually used in German-speaking countries. */
  imprintV2?: Maybe<Content>;
  /** The integrations connected to the publication. */
  integrations?: Maybe<PublicationIntegrations>;
  /** Details of publication invites. Returns null if publication is not a team publication. */
  invites?: Maybe<PublicationInvite>;
  /** Returns true if GitHub backup is configured and active and false otherwise. */
  isGitHubBackupEnabled: Scalars['Boolean']['output'];
  /** Returns whether the publication's GitHub source repo is connected. */
  isGithubAsSourceConnected: Scalars['Boolean']['output'];
  /** A flag to indicate if the publication is using Headless CMS. This can be used to check if the post redirect needs authentication. */
  isHeadless: Scalars['Boolean']['output'];
  /** True if the publication is a team publication and false otherwise. */
  isTeam: Scalars['Boolean']['output'];
  /** Links to the publication's social media profiles. */
  links?: Maybe<PublicationLinks>;
  /** The meta tags associated with the publication. */
  metaTags?: Maybe<Scalars['String']['output']>;
  /** Information about the publication's Open Graph metadata i.e. image. */
  ogMetaData: OpenGraphMetaData;
  /** Returns the pinned post of the publication. */
  pinnedPost?: Maybe<Post>;
  /** Returns the post with the given slug. */
  post?: Maybe<Post>;
  /** Returns the list of posts in the publication. */
  posts: PublicationPostConnection;
  postsViaPage: PublicationPostPageConnection;
  /** The publication preferences around layout, theme and other personalisations. */
  preferences: Preferences;
  /** Publications that are recommended by this publication. */
  recommendedPublications: Array<UserRecommendedPublicationEdge>;
  /** Publications that are recommending this publication. */
  recommendingPublications: PublicationUserRecommendingPublicationConnection;
  /**
   * Returns a post by a previous slug. It does not resolve a post by its current slug.
   *
   * If a slug has been changed, we'll create a redirect from the old slug to the new one.
   * With `redirectedPost` you can resolve a post by the old slug.
   *
   * This can be used to redirect a user to the new post slug (via `redirectedPost.slug`).
   */
  redirectedPost?: Maybe<Post>;
  /** Configured redirection rules for the publication. */
  redirectionRules: Array<RedirectionRule>;
  /** Returns the scheduled drafts of the publication by the authenticated user. */
  scheduledDrafts: DraftConnection;
  /** Returns series by slug in the publication. */
  series?: Maybe<Series>;
  /** Returns the list of series in the publication. */
  seriesList: SeriesConnection;
  /** Contains the publication's sponsorships information. */
  sponsorship?: Maybe<PublicationSponsorship>;
  /** Returns the static page with the given slug. */
  staticPage?: Maybe<StaticPage>;
  /** Returns a list of static pages in the publication. */
  staticPages: StaticPageConnection;
  /** Returns the list of submitted drafts in the publication. */
  submittedDrafts: DraftConnection;
  /**
   * The title of the publication.
   * Title is used as logo if logo is not provided.
   */
  title: Scalars['String']['output'];
  /** The total amount of recommended publications by this publication. */
  totalRecommendedPublications: Scalars['Int']['output'];
  /** The domain of the publication. Used to access publication. Example https://johndoe.com */
  url: Scalars['String']['output'];
  /** Determines the structure of the post URLs. */
  urlPattern: UrlPattern;
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationAllDraftsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationAllScheduledDraftsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationDraftsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PublicationDraftConnectionFilter>;
  first: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationPostArgs = {
  slug: Scalars['String']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PublicationPostConnectionFilter>;
  first: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationPostsViaPageArgs = {
  filter?: InputMaybe<PublicationPostsViaPageFilter>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationRecommendingPublicationsArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationRedirectedPostArgs = {
  slug: Scalars['String']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationScheduledDraftsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PublicationDraftConnectionFilter>;
  first: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationSeriesArgs = {
  slug: Scalars['String']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationSeriesListArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationStaticPageArgs = {
  slug: Scalars['String']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationStaticPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


/**
 * Contains basic information about the publication.
 * A publication is a blog that can be created for a user or a team.
 */
export type PublicationSubmittedDraftsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PublicationDraftConnectionFilter>;
  first: Scalars['Int']['input'];
};

/**
 * Connection to get list of drafts in publications.
 * Returns a list of edges which contains the drafts in publication and cursor to the last item of the previous page.
 */
export type PublicationDraftConnectionFilter = {
  /** Search filter will be applied to the title of a draft */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Contains the publication's beta features. */
export type PublicationFeatures = {
  __typename?: 'PublicationFeatures';
  /**
   * Audio player for blog posts.
   * @deprecated Audio Blogs are not supported anymore. This field will be removed 18/04/23
   */
  audioBlog: AudioBlogFeature;
  /** Individual styling for the publication. */
  customCSS: CustomCssFeature;
  /** GPT Bot crawler to index the publication. */
  gptBotCrawling: GptBotCrawlingFeature;
  /** Headless CMS for the publication. */
  headlessCMS: HeadlessCmsFeature;
  /** Newsletter feature for the publication which adds a `/newsletter` route for collecting subscribers and allows sending out newsletters. */
  newsletter: NewsletterFeature;
  /** Flag to denote if publication is a pro team's publication. */
  proTeam: ProTeamFeature;
  /** Show the read time for blog posts. */
  readTime: ReadTimeFeature;
  /** Widget that shows up if a text on a blog post is selected. Allows for easy sharing or copying of the selected text. */
  textSelectionSharer: TextSelectionSharerFeature;
  /** Show the view count for blog posts. */
  viewCount: ViewCountFeature;
};

/**
 * Contains the publication's integrations.
 * Used to connect the publication with third party services like Google Analytics, Facebook Pixel, etc.
 */
export type PublicationIntegrations = {
  __typename?: 'PublicationIntegrations';
  /** Custom domain for integration with Fathom Analytics. */
  fathomCustomDomain?: Maybe<Scalars['String']['output']>;
  /** A flag indicating if the custom domain is enabled for integration with Fathom Analytics. */
  fathomCustomDomainEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Fathom Analytics Site ID for integration with Fathom Analytics. */
  fathomSiteID?: Maybe<Scalars['String']['output']>;
  /** FB Pixel ID for integration with Facebook Pixel. */
  fbPixelID?: Maybe<Scalars['String']['output']>;
  /** Google Tag Manager ID for integration with Google Tag Manager. */
  gTagManagerID?: Maybe<Scalars['String']['output']>;
  /** Google Analytics Tracking ID for integration with Google Analytics. */
  gaTrackingID?: Maybe<Scalars['String']['output']>;
  /** Hotjar Site ID for integration with Hotjar. */
  hotjarSiteID?: Maybe<Scalars['String']['output']>;
  /** Matomo Site ID for integration with Matomo Analytics. */
  matomoSiteID?: Maybe<Scalars['String']['output']>;
  /** Matomo URL for integration with Matomo Analytics. */
  matomoURL?: Maybe<Scalars['String']['output']>;
  /** A flag indicating if the custom domain is enabled for integration with Plausible Analytics. */
  plausibleAnalyticsEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** The share ID for the Hashnode-provided Umami analytics instance. */
  umamiShareId?: Maybe<Scalars['String']['output']>;
  /** The ID for the Hashnode-provided Umami analytics instance. */
  umamiWebsiteUUID?: Maybe<Scalars['String']['output']>;
  /** Web Monetization Payment Pointer for integration with Web Monetization. */
  wmPaymentPointer?: Maybe<Scalars['String']['output']>;
};

/** Contains the publication invite information. */
export type PublicationInvite = {
  __typename?: 'PublicationInvite';
  /**
   * Signifies if invite links in role-based invites are active.
   * Users trying to join by role-based invite can only join if this is enabled.
   */
  areRoleBasedInviteLinksActive: Scalars['Boolean']['output'];
  pendingInvites: PendingInviteConnection;
  /** The paginated list of role based invites. */
  roleBasedInvites: RoleBasedInviteConnection;
};


/** Contains the publication invite information. */
export type PublicationInvitePendingInvitesArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/** Contains the publication invite information. */
export type PublicationInviteRoleBasedInvitesArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

/** Contains publication's layout choices. */
export enum PublicationLayout {
  /** Changes the layout of blog into grid 3 post cards per row. */
  Grid = 'grid',
  /**
   * Changes the layout of blog into magazine style.
   * This is the newest layout.
   */
  Magazine = 'magazine',
  /** Changes the layout of blog into stacked list of posts. */
  Stacked = 'stacked'
}

/** Contains the publication's social media links. */
export type PublicationLinks = {
  __typename?: 'PublicationLinks';
  /** Daily.dev URL of the publication. */
  dailydev?: Maybe<Scalars['String']['output']>;
  /** GitHub URL of the publication. */
  github?: Maybe<Scalars['String']['output']>;
  /** Hashnode profile of author of the publication. */
  hashnode?: Maybe<Scalars['String']['output']>;
  /** Instagram URL of the publication. */
  instagram?: Maybe<Scalars['String']['output']>;
  /** LinkedIn URL of the publication. */
  linkedin?: Maybe<Scalars['String']['output']>;
  /** Mastodon URL of the publication. */
  mastodon?: Maybe<Scalars['String']['output']>;
  /** Twitter URL of the publication. */
  twitter?: Maybe<Scalars['String']['output']>;
  /** Website URL of the publication. */
  website?: Maybe<Scalars['String']['output']>;
  /** YouTube URL of the publication. */
  youtube?: Maybe<Scalars['String']['output']>;
};

/** Contains the publication member information. */
export type PublicationMember = Node & {
  __typename?: 'PublicationMember';
  /** The ID of the publication member. */
  id: Scalars['ID']['output'];
  /**
   * Denotes if the member is public or private
   * A private member is not visible on members page
   */
  privacyState?: Maybe<PublicationMemberPrivacyState>;
  /** The role of the user in the publication. */
  role: UserPublicationRole;
  /** The user who is a member of the publication. */
  user?: Maybe<User>;
};

/** Publication member privacy state on members page */
export enum PublicationMemberPrivacyState {
  /** The member is private and not visible on the members page. */
  Private = 'PRIVATE',
  /** The member is public and visible on the members page. */
  Public = 'PUBLIC'
}

/** Contains the publication's navbar items. */
export type PublicationNavbarItem = {
  __typename?: 'PublicationNavbarItem';
  /** The unique identifier of the navbar item. */
  id: Scalars['ID']['output'];
  /** The label of the navbar item. */
  label?: Maybe<Scalars['String']['output']>;
  /** The static page added to the navbar item. */
  page?: Maybe<StaticPage>;
  /**
   * The order of the navbar item.
   * @deprecated Navbar items are already returned in the correct order. Priority value is not needed and might be 0 in most cases.
   */
  priority?: Maybe<Scalars['Int']['output']>;
  /** The series added to the navbar item. */
  series?: Maybe<Series>;
  /** The type of the navbar item, can be series, link or page. */
  type: PublicationNavigationType;
  /** The URL of the navbar item. */
  url?: Maybe<Scalars['String']['output']>;
};

/** The type of the navbar item, can be series, link or page. */
export enum PublicationNavigationType {
  /** The navbar item is a link. */
  Link = 'link',
  /** The navbar item is a static page. */
  Page = 'page',
  /** The navbar item is a series. */
  Series = 'series'
}

/**
 * Connection for posts within a publication. Contains a list of edges containing nodes.
 * Each node is a post.
 * Page info contains information about pagination like hasNextPage and endCursor.
 */
export type PublicationPostConnection = Connection & {
  __typename?: 'PublicationPostConnection';
  /** A list of edges containing Post information */
  edges: Array<PostEdge>;
  /** Information for pagination in Post connection. */
  pageInfo: PageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/**
 * Connection to get list of posts in publications.
 * Returns a list of edges which contains the posts in publication and cursor to the last item of the previous page.
 */
export type PublicationPostConnectionFilter = {
  /** Only return posts that are deleted. Query returns active posts by default, set this to true to return deleted posts. */
  deletedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Remove pinned post from the result set. */
  excludePinnedPost?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Filtering by tag slugs and tag IDs will return posts that match either of the filters.
   *
   * It is an "OR" filter and not an "AND" filter.
   */
  tagSlugs?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Filtering by tag slugs and tag IDs will return posts that match either of the filters.
   *
   * It is an "OR" filter and not an "AND" filter.
   */
  tags?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
};

export type PublicationPostPageConnection = PageConnection & {
  __typename?: 'PublicationPostPageConnection';
  /** The posts belonging to the publication. */
  nodes: Array<Post>;
  /** Information to aid in pagination. */
  pageInfo: OffsetPageInfo;
  /** The total number of posts. */
  totalDocuments: Scalars['Int']['output'];
};

export type PublicationPostsViaPageFilter = {
  /** Remove pinned post from the result set. */
  excludePinnedPosts?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Filtering by tag slugs and tag IDs will return posts that match either of the filters.
   *
   * It is an "OR" filter and not an "AND" filter.
   */
  tagSlugs?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Filtering by tag slugs and tag IDs will return posts that match either of the filters.
   *
   * It is an "OR" filter and not an "AND" filter.
   */
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/**
 * Contains the publication's Sponsorship information.
 * User can sponsor their favorite publications and pay them directly using Stripe.
 */
export type PublicationSponsorship = {
  __typename?: 'PublicationSponsorship';
  /**
   * The content shared by author of the publication to their sponsors.
   * This is used as note to inform that author is open for sponsorship.
   */
  content?: Maybe<Content>;
  /** The Stripe configuration of the publication's Sponsorship. */
  stripe?: Maybe<StripeConfiguration>;
};

export type PublicationUserRecommendingPublicationConnection = PageConnection & {
  __typename?: 'PublicationUserRecommendingPublicationConnection';
  /** A list of edges containing Post information */
  edges: Array<UserRecommendingPublicationEdge>;
  /** Publications recommending this publication. */
  nodes: Array<Publication>;
  /** Information for page based pagination in Post connection. */
  pageInfo: OffsetPageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

export type PublicationViewEdge = Edge & {
  __typename?: 'PublicationViewEdge';
  cursor: Scalars['String']['output'];
  node: Views;
};

export type PublicationVisitorsEdge = Edge & {
  __typename?: 'PublicationVisitorsEdge';
  cursor: Scalars['String']['output'];
  node: Visitors;
};

export type PublishDraftInput = {
  /** The id of the draft that should be published */
  draftId: Scalars['ObjectId']['input'];
};

export type PublishDraftPayload = {
  __typename?: 'PublishDraftPayload';
  /** The newly created post based on the draft */
  post?: Maybe<Post>;
};

/** Contains information about the post to be published. */
export type PublishPostInput = {
  /** Ids of the co-authors of the post. */
  coAuthors?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
  /** Content of the post in markdown format. */
  contentMarkdown: Scalars['String']['input'];
  /** Options for the cover image of the post. */
  coverImageOptions?: InputMaybe<CoverImageOptionsInput>;
  /** A flag to indicate if the comments are disabled for the post. */
  disableComments?: InputMaybe<Scalars['Boolean']['input']>;
  /** Information about the meta tags added to the post, used for SEO purpose. */
  metaTags?: InputMaybe<MetaTagsInput>;
  /** The URL of the original article if the post is imported from an external source. */
  originalArticleURL?: InputMaybe<Scalars['String']['input']>;
  /** The ID of publication the post belongs to. */
  publicationId: Scalars['ObjectId']['input'];
  /**
   * Publish the post on behalf of another user who is a member of the publication.
   *
   * Only applicable for team publications.
   */
  publishAs?: InputMaybe<Scalars['ObjectId']['input']>;
  /** Date when the post is published. */
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Providing a seriesId will add the post to that series. */
  seriesId?: InputMaybe<Scalars['ObjectId']['input']>;
  /** Settings for the post like table of contents and newsletter activation. */
  settings?: InputMaybe<PublishPostSettingsInput>;
  /** Slug of the post. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The subtitle of the post. */
  subtitle?: InputMaybe<Scalars['String']['input']>;
  /**
   * A list of tags to add to the post. You can get a list of popular tags available on Hashnode here.
   * https://github.com/Hashnode/support/blob/main/misc/tags.json
   */
  tags?: InputMaybe<Array<PublishPostTagInput>>;
  /** The title of the post. */
  title: Scalars['String']['input'];
};

export type PublishPostPayload = {
  __typename?: 'PublishPostPayload';
  post?: Maybe<Post>;
};

export type PublishPostSettingsInput = {
  /** A flag to indicate if the post is delisted, used to hide the post from public feed. */
  delisted?: InputMaybe<Scalars['Boolean']['input']>;
  /** A flag to indicate if the post contains table of content */
  enableTableOfContent?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to send a newsletter for this post. */
  isNewsletterActivated?: InputMaybe<Scalars['Boolean']['input']>;
  /** A flag to indicate if the post is scheduled. */
  scheduled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Flag to indicate if the slug is overridden by the user. */
  slugOverridden?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PublishPostTagInput = {
  /**
   * A tag id that is referencing an existing tag.
   *
   * Either this or name and slug should be provided. If both are provided, the id will be used.
   */
  id?: InputMaybe<Scalars['ObjectId']['input']>;
  /**
   * A name of a new tag to create.
   *
   * Either this and slug or id should be provided. If both are provided, the id will be used.
   */
  name?: InputMaybe<Scalars['String']['input']>;
  /**
   * A slug of a new tag to create.
   *
   * Either this and name or id should be provided. If both are provided, the id will be used.
   */
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * Returns a draft by ID.
   * Draft is a post that is not published yet.
   */
  draft?: Maybe<Draft>;
  /**
   * Returns a paginated list of posts based on the provided filter.
   * Used in Hashnode home feed.
   */
  feed: FeedPostConnection;
  /** Returns the current authenticated user. Only available to the authenticated user. */
  me: MyUser;
  /** Returns post by ID. Can be used to render post page on blog. */
  post?: Maybe<Post>;
  /**
   * Returns the publication with the given ID or host.
   * User can pass anyone of them.
   */
  publication?: Maybe<Publication>;
  /** Get a scheduled post by ID. */
  scheduledPost?: Maybe<ScheduledPost>;
  /** Returns a paginated list of posts based on search query for a particular publication id. */
  searchPostsOfPublication: SearchPostConnection;
  /** Returns tag details by its slug. */
  tag?: Maybe<Tag>;
  /** Returns users who have most actively participated in discussions by commenting in the last 7 days. */
  topCommenters: CommenterUserConnection;
  /** Returns the user with the username. */
  user?: Maybe<User>;
};


export type QueryDraftArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryFeedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FeedFilter>;
  first: Scalars['Int']['input'];
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPublicationArgs = {
  host?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ObjectId']['input']>;
};


export type QueryScheduledPostArgs = {
  id?: InputMaybe<Scalars['ObjectId']['input']>;
};


export type QuerySearchPostsOfPublicationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter: SearchPostsOfPublicationFilter;
  first: Scalars['Int']['input'];
};


export type QueryTagArgs = {
  slug: Scalars['String']['input'];
};


export type QueryTopCommentersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type RssImport = Node & {
  __typename?: 'RSSImport';
  id: Scalars['ID']['output'];
  /** Indicates whether posts should be imported as drafts or not */
  importAsDrafts: Scalars['Boolean']['output'];
  /** RSS Tag name to be considered as the post content for automatic import. */
  rssTagName?: Maybe<Scalars['String']['output']>;
  /** The URL pointing to the RSS feed. */
  rssURL: Scalars['String']['output'];
  /** Indicates whether the posts should be scraped or not */
  scrapePosts: Scalars['Boolean']['output'];
};

/**
 * Contains the flag indicating if the read time feature is enabled or not.
 * User can enable or disable the read time feature from the publication settings.
 * Shows read time on blogs if enabled.
 */
export type ReadTimeFeature = Feature & {
  __typename?: 'ReadTimeFeature';
  /** A flag indicating if the read time feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
};

export type RecommendPublicationsInput = {
  recommendedPublicationIds: Array<Scalars['ID']['input']>;
  recommendingPublicationId: Scalars['ID']['input'];
};

export type RecommendPublicationsPayload = {
  __typename?: 'RecommendPublicationsPayload';
  recommendedPublications?: Maybe<Array<UserRecommendedPublicationEdge>>;
};

/** Contains a publication and a cursor for pagination. */
export type RecommendedPublicationEdge = Edge & {
  __typename?: 'RecommendedPublicationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The node holding the Publication information */
  node: Publication;
};

export type RedirectionRule = Node & {
  __typename?: 'RedirectionRule';
  /** The destination URL of the redirection rule. */
  destination: Scalars['URL']['output'];
  id: Scalars['ID']['output'];
  /** The source URL of the redirection rule. */
  source: Scalars['String']['output'];
  /** The type of the redirection rule. */
  type: HttpRedirectionType;
};

/** Input to reinvite a user to a publication. */
export type ReinviteUserToPublicationInput = {
  /** The ID of the invitation to resend. */
  inviteId: Scalars['ID']['input'];
  /** The publication ID to resend the invitation from. */
  publicationId: Scalars['ID']['input'];
};

/** Response to reinviting a user to a publication. */
export type ReinviteUserToPublicationPayload = {
  __typename?: 'ReinviteUserToPublicationPayload';
  /** Signifies if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

export type RemoveCommentInput = {
  id: Scalars['ID']['input'];
};

export type RemoveCommentPayload = {
  __typename?: 'RemoveCommentPayload';
  comment?: Maybe<Comment>;
};

export type RemovePostInput = {
  /** The ID of the post to remove. */
  id: Scalars['ID']['input'];
};

export type RemovePostPayload = {
  __typename?: 'RemovePostPayload';
  /** The deleted post. */
  post?: Maybe<Post>;
};

/** Input to remove a user from a publication. */
export type RemovePublicationMemberInput = {
  /** The publication ID the user is a member of. */
  publicationId: Scalars['ID']['input'];
  /** The username of the user to remove from the publication. */
  username: Scalars['String']['input'];
};

/** Response to removing a user from a publication. */
export type RemovePublicationMemberPayload = {
  __typename?: 'RemovePublicationMemberPayload';
  /** Returns the removed publication member. */
  member: PublicationMember;
};

export type RemoveRecommendationInput = {
  recommendedPublicationId: Scalars['ID']['input'];
  recommendingPublicationId: Scalars['ID']['input'];
};

export type RemoveRecommendationPayload = {
  __typename?: 'RemoveRecommendationPayload';
  recommendedPublication: Publication;
};

export type RemoveRedirectionRuleInput = {
  id: Scalars['ID']['input'];
  publicationId: Scalars['ID']['input'];
};

export type RemoveRedirectionRulePayload = {
  __typename?: 'RemoveRedirectionRulePayload';
  redirectionRule: RedirectionRule;
};

export type RemoveReplyInput = {
  commentId: Scalars['ID']['input'];
  replyId: Scalars['ID']['input'];
};

export type RemoveReplyPayload = {
  __typename?: 'RemoveReplyPayload';
  reply?: Maybe<Reply>;
};

export type RemoveSeriesInput = {
  /** The id of the series to remove. */
  id: Scalars['ID']['input'];
};

export type RemoveSeriesPayload = {
  __typename?: 'RemoveSeriesPayload';
  /** Returns the updated series. */
  series: Series;
};

/**
 * Contains basic information about the reply.
 * A reply is a response to a comment.
 */
export type Reply = Node & {
  __typename?: 'Reply';
  /** The author of the reply. */
  author: User;
  /** The content of the reply in markdown and html format. */
  content: Content;
  /** The date the reply was created. */
  dateAdded: Scalars['DateTime']['output'];
  /** The ID of the reply. */
  id: Scalars['ID']['output'];
  /** Total number of reactions on the reply by the authenticated user. User must be authenticated to use this field. */
  myTotalReactions: Scalars['Int']['output'];
  /**
   * A unique string identifying the reply. Used as element id in the DOM on hashnode blogs.
   * It can be used to scroll to the reply in browser.
   */
  stamp?: Maybe<Scalars['String']['output']>;
  /** Total number of reactions on the reply. Reactions are hearts added to any reply. */
  totalReactions: Scalars['Int']['output'];
};

export type RescheduleDraftInput = {
  /** The Draft ID of the scheduled draft. */
  draftId: Scalars['ID']['input'];
  /** New scheduled date for the draft to be rescheduled. */
  publishAt: Scalars['DateTime']['input'];
};

export type RescheduleDraftPayload = {
  __typename?: 'RescheduleDraftPayload';
  /** Payload returned in response of reschedulePost mutation. */
  scheduledPost: ScheduledPost;
};

export type ResendWebhookRequestInput = {
  webhookId: Scalars['ID']['input'];
  webhookMessageId: Scalars['ID']['input'];
};

export type ResendWebhookRequestPayload = {
  __typename?: 'ResendWebhookRequestPayload';
  webhookMessage?: Maybe<WebhookMessage>;
};

export type RestorePostInput = {
  id: Scalars['ID']['input'];
};

export type RestorePostPayload = {
  __typename?: 'RestorePostPayload';
  post?: Maybe<Post>;
};

/** Input to revoke a user invitation to a publication. */
export type RevokeUserInviteToPublicationInput = {
  /** The invite ID to revoke. */
  inviteId: Scalars['ID']['input'];
  /** The publication ID to revoke the invite from. */
  publicationId: Scalars['ID']['input'];
};

/** Response to revoking a user invitation to a publication. */
export type RevokeUserInviteToPublicationPayload = {
  __typename?: 'RevokeUserInviteToPublicationPayload';
  /** Signifies if the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

/** Contains the role based invite information. */
export type RoleBasedInvite = Node & {
  __typename?: 'RoleBasedInvite';
  /** The capacity of how many members to be invited by the link. */
  capacity?: Maybe<Scalars['Int']['output']>;
  /** The date the invite was created. */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The expiry date of the invite. */
  expiryDate?: Maybe<Scalars['DateTime']['output']>;
  /** The ID of the role based invite. */
  id: Scalars['ID']['output'];
  /** Invite link of the role based invite. */
  inviteLink?: Maybe<Scalars['String']['output']>;
  /** Boolean that signifies if the invite has unlimited capacity. */
  isUnlimitedCapacity?: Maybe<Scalars['Boolean']['output']>;
  /** The role assigned to the user in the publication. */
  role: UserPublicationRole;
  /** The number of members that have already used the link to join the team. */
  usedCapacity?: Maybe<Scalars['Int']['output']>;
};

export type RoleBasedInviteConnection = PageConnection & {
  __typename?: 'RoleBasedInviteConnection';
  /** A list of invites */
  nodes: Array<RoleBasedInvite>;
  /** Information to aid in pagination. */
  pageInfo: OffsetPageInfo;
  /** The total number of invites. */
  totalDocuments: Scalars['Int']['output'];
};

/** Information to help in seo related meta tags. */
export type Seo = {
  __typename?: 'SEO';
  /** The description used in og:description tag for SEO purposes. */
  description?: Maybe<Scalars['String']['output']>;
  /** The title used in og:title tag for SEO purposes. */
  title?: Maybe<Scalars['String']['output']>;
};

export type ScheduleDraftInput = {
  /** The Author ID of the draft that should be published */
  authorId: Scalars['ID']['input'];
  /** The id of the draft that should be published */
  draftId: Scalars['ID']['input'];
  /** The date the draft should be published */
  publishAt: Scalars['DateTime']['input'];
};

export type ScheduleDraftPayload = {
  __typename?: 'ScheduleDraftPayload';
  /** Payload returned in response of reschedulePost mutation. */
  scheduledPost: ScheduledPost;
};

/**
 * Contains basic information about the scheduled post.
 * A scheduled post is a post that is scheduled to be published in the future.
 */
export type ScheduledPost = Node & {
  __typename?: 'ScheduledPost';
  /** The date the scheduled post was created. */
  author: User;
  /** Returns the draft associated with the scheduled post. */
  draft?: Maybe<Draft>;
  /** The ID of the scheduled post. */
  id: Scalars['ID']['output'];
  /** Returns the publication the post is scheduled for. */
  publication: Publication;
  /** Returns user who scheduled the post. This is usually the author of the post. */
  scheduledBy?: Maybe<User>;
  /** The scheduled date for the post to be published. This is the date the post will be published. */
  scheduledDate: Scalars['DateTime']['output'];
};

/** Enum of all the scopes that can be used with the @requireAuth directive. */
export enum Scope {
  AcknowledgeEmailImport = 'acknowledge_email_import',
  ActiveProUser = 'active_pro_user',
  AssignProPublications = 'assign_pro_publications',
  ChangeProSubscription = 'change_pro_subscription',
  CreatePro = 'create_pro',
  DeleteDraft = 'delete_draft',
  DocsEditorOrOwner = 'docs_editor_or_owner',
  DocsOwner = 'docs_owner',
  ImportSubscribersToPublication = 'import_subscribers_to_publication',
  InvitedTeamUser = 'invited_team_user',
  MoveDraft = 'move_draft',
  PublicationAdmin = 'publication_admin',
  PublicationAuthor = 'publication_author',
  PublicationMember = 'publication_member',
  PublishComment = 'publish_comment',
  PublishDraft = 'publish_draft',
  PublishPost = 'publish_post',
  PublishReply = 'publish_reply',
  RecommendPublications = 'recommend_publications',
  RejectDraftSubmission = 'reject_draft_submission',
  RemoveComment = 'remove_comment',
  RemoveReply = 'remove_reply',
  RestorePost = 'restore_post',
  Signup = 'signup',
  SubmitDraft = 'submit_draft',
  TeamHashnode = 'team_hashnode',
  UpdateComment = 'update_comment',
  UpdateDraft = 'update_draft',
  UpdatePost = 'update_post',
  UpdateReply = 'update_reply',
  WebhookAdmin = 'webhook_admin',
  WriteDraft = 'write_draft',
  WriteDraftRevision = 'write_draft_revision',
  WritePost = 'write_post',
  WriteSeries = 'write_series',
  WriteStaticPage = 'write_static_page',
  WriteWidget = 'write_widget'
}

/**
 * Connection for posts within a publication search. Contains a list of edges containing nodes.
 * Each node is a post.
 * Page info contains information about pagination like hasNextPage and endCursor.
 */
export type SearchPostConnection = Connection & {
  __typename?: 'SearchPostConnection';
  /** A list of edges containing Post information */
  edges: Array<PostEdge>;
  /** Information for pagination in Post connection. */
  pageInfo: PageInfo;
};

export type SearchPostsOfPublicationFilter = {
  /** An array of author Ids to filter the posts. */
  authorIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Only return posts that are deleted. Query returns active posts by default, set this to true to return deleted posts. */
  deletedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of publications to search from. */
  publicationId: Scalars['ObjectId']['input'];
  /** The query to be searched in post. */
  query?: InputMaybe<Scalars['String']['input']>;
};

export type SearchUser = Node & {
  __typename?: 'SearchUser';
  /** ID of the user. */
  id: Scalars['ID']['output'];
  /** Signifies if the user has a pending invite to the publication. Returned when the filter has pendingInviteStatus set to true. */
  pendingInviteStatus?: Maybe<Scalars['Boolean']['output']>;
  /** User node containing the user information. */
  user: User;
};

/**
 * Contains basic information about the series.
 * A series is a collection of posts that are related to each other.
 */
export type Series = Node & {
  __typename?: 'Series';
  /** Returns the user who is author of the series. */
  author: User;
  /** The cover image of the series. */
  coverImage?: Maybe<Scalars['String']['output']>;
  /** The date and time the series was created. */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier for the series. */
  cuid?: Maybe<Scalars['ID']['output']>;
  /** The description of the series. Contains markdown and html version of the series's description. */
  description?: Maybe<Content>;
  /** The ID of the series. */
  id: Scalars['ID']['output'];
  /** The name of the series. Shown in series page. */
  name: Scalars['String']['output'];
  /** Returns a list of posts in the series. */
  posts: SeriesPostConnection;
  /** The slug of the series. Used to access series page.  Example https://johndoe.com/series/series-slug */
  slug: Scalars['String']['output'];
  /** The sort order of the series, determines if the latest posts should appear first or last in series. */
  sortOrder: SortOrder;
};


/**
 * Contains basic information about the series.
 * A series is a collection of posts that are related to each other.
 */
export type SeriesPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

/**
 * Connection for Series. Contains a list of edges containing nodes.
 * Each node is a Series.
 * Page info contains information about pagination like hasNextPage and endCursor.
 */
export type SeriesConnection = Connection & {
  __typename?: 'SeriesConnection';
  /** A list of edges containing Series information */
  edges: Array<SeriesEdge>;
  /** Information for pagination in SeriesList connection. */
  pageInfo: PageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/** Contains a Series and a cursor for pagination. */
export type SeriesEdge = Edge & {
  __typename?: 'SeriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The node holding the Series information */
  node: Series;
};

/**
 * Connection for posts within a series. Contains a list of edges containing nodes.
 * Each node is a post.
 * Page info contains information about pagination like hasNextPage and endCursor.
 */
export type SeriesPostConnection = Connection & {
  __typename?: 'SeriesPostConnection';
  /** A list of edges containing Post information */
  edges: Array<PostEdge>;
  /** Information for pagination in Post connection. */
  pageInfo: PageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/** Available social media links. */
export type SocialMediaLinks = {
  __typename?: 'SocialMediaLinks';
  /** The user's Facebook profile. */
  facebook?: Maybe<Scalars['String']['output']>;
  /** The user's GitHub profile. */
  github?: Maybe<Scalars['String']['output']>;
  /** The user's Instagram profile. */
  instagram?: Maybe<Scalars['String']['output']>;
  /** The user's LinkedIn profile. */
  linkedin?: Maybe<Scalars['String']['output']>;
  /** The user's StackOverflow profile. */
  stackoverflow?: Maybe<Scalars['String']['output']>;
  /** The user's Twitter profile. */
  twitter?: Maybe<Scalars['String']['output']>;
  /** The user's website. */
  website?: Maybe<Scalars['String']['output']>;
  /** The user's YouTube profile. */
  youtube?: Maybe<Scalars['String']['output']>;
};

/** SortOrder is a common enum for all types that can be sorted. */
export enum SortOrder {
  Asc = 'asc',
  Dsc = 'dsc'
}

/**
 * Contains basic information about the static page.
 * Static pages are pages that are written in markdown and can be added to blog.
 */
export type StaticPage = Node & {
  __typename?: 'StaticPage';
  /** Content of the static page. Contains markdown and html version of the static page's content. */
  content: Content;
  /** A flag to determine if the static page is hidden from public or not, this is used to hide the page instead of deleting it. */
  hidden: Scalars['Boolean']['output'];
  /** The ID of the static page. */
  id: Scalars['ID']['output'];
  /** Information about the static page's Open Graph metadata i.e. image. */
  ogMetaData?: Maybe<OpenGraphMetaData>;
  /** Information about the static page's SEO metadata i.e. title and description. */
  seo?: Maybe<Seo>;
  /** The slug of the static page. Used to access static page. Example `https://johndoe.com/my-page`. */
  slug: Scalars['String']['output'];
  /** The title of the static page. Shown in nav bar. */
  title: Scalars['String']['output'];
};

/**
 * Connection to get list of static pages.
 * Returns a list of edges which contains the static page and cursor to the last item of the previous page.
 */
export type StaticPageConnection = Connection & {
  __typename?: 'StaticPageConnection';
  /** A list of edges containing nodes in the connection. */
  edges: Array<StaticPageEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/** An edge that contains a node of type static page and cursor to the node. */
export type StaticPageEdge = Edge & {
  __typename?: 'StaticPageEdge';
  /** A cursor to the last item of the previous page. */
  cursor: Scalars['String']['output'];
  /** The node containing a static page. */
  node: StaticPage;
};

/** Contains the publication's Stripe configuration. */
export type StripeConfiguration = {
  __typename?: 'StripeConfiguration';
  /** The Stripe account ID of the publication. */
  accountId?: Maybe<Scalars['String']['output']>;
  /** A flag indicating if the publication is connected to Stripe. */
  connected: Scalars['Boolean']['output'];
  /** The country of origin of the publication. */
  country?: Maybe<Scalars['String']['output']>;
};

export type SubscribeToNewsletterInput = {
  /** The email of the subscriber. */
  email: Scalars['String']['input'];
  /** The ID of the publication to subscribe to. */
  publicationId: Scalars['ObjectId']['input'];
};

export type SubscribeToNewsletterPayload = {
  __typename?: 'SubscribeToNewsletterPayload';
  status?: Maybe<NewsletterSubscribeStatus>;
};

export type TableOfContentsFeature = Feature & {
  __typename?: 'TableOfContentsFeature';
  /** Whether or not the user has chosen to show a table of contents on the post. */
  isEnabled: Scalars['Boolean']['output'];
  /** The content of the table of contents. */
  items: Array<TableOfContentsItem>;
};

export type TableOfContentsItem = Node & {
  __typename?: 'TableOfContentsItem';
  /** Unique identifier. */
  id: Scalars['ID']['output'];
  /** The level of nesting. Refers to the heading level in the post. */
  level: Scalars['Int']['output'];
  /** ID of the `TableOfContentsItem` that is one level higher in the hierarchy. `null` if this is a top level item. */
  parentId?: Maybe<Scalars['ID']['output']>;
  /** The slug of the referenced headline. */
  slug: Scalars['String']['output'];
  /** The title of the referenced headline. */
  title: Scalars['String']['output'];
};

export type Tag = ITag & Node & {
  __typename?: 'Tag';
  /** Total number of users following this tag. */
  followersCount: Scalars['Int']['output'];
  /** The ID of the tag. */
  id: Scalars['ID']['output'];
  /** Information about the tag. Contains markdown html and text version of the tag's info. */
  info?: Maybe<Content>;
  /** The logo of the tag. Shown in tag page. */
  logo?: Maybe<Scalars['String']['output']>;
  /** The name of the tag. Shown in tag page. */
  name: Scalars['String']['output'];
  /** Paginated list of posts published under this tag */
  posts: FeedPostConnection;
  /** Alltime usage count of this tag in posts. */
  postsCount: Scalars['Int']['output'];
  /** The slug of the tag. Used to access tags feed.  Example https://hashnode.com/n/graphql */
  slug: Scalars['String']['output'];
  /** The tagline of the tag. */
  tagline?: Maybe<Scalars['String']['output']>;
};


export type TagPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter: TagPostConnectionFilter;
  first: Scalars['Int']['input'];
};

/** Contains a tag and a cursor for pagination. */
export type TagEdge = Edge & {
  __typename?: 'TagEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The node holding the Tag information */
  node: Tag;
};

export type TagPostConnectionFilter = {
  /** Sort tag feed by recents, popular, or trending. Defaults to recents. */
  sortBy?: InputMaybe<TagPostsSort>;
};

/** The field by which to sort the tag feed. */
export enum TagPostsSort {
  /** Sorts by popularity, used in Hot tag feed. */
  Popular = 'popular',
  /** Determinate how to sort the results. Defaults to recents, used in New tag feed. */
  Recent = 'recent',
  /** Trending is particular used to fetch top posts trending within a week time under a tag */
  Trending = 'trending'
}

/**
 * Contains the flag indicating if the text selection sharer feature is enabled or not.
 * User can enable or disable the text selection sharer feature from the publication settings.
 * Shows a widget if a text on a blog post is selected. Allows for easy sharing or copying of the selected text.
 */
export type TextSelectionSharerFeature = Feature & {
  __typename?: 'TextSelectionSharerFeature';
  /** A flag indicating if the text selection sharer feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
};

export type ToggleAllowContributorEditsInput = {
  publicationId: Scalars['ID']['input'];
};

export type ToggleAllowContributorEditsPayload = {
  __typename?: 'ToggleAllowContributorEditsPayload';
  publication?: Maybe<Publication>;
};

/** Payload for the toggleFollowingUser mutation. */
export type ToggleFollowUserPayload = {
  __typename?: 'ToggleFollowUserPayload';
  /** The user that was followed/unfollowed. */
  user?: Maybe<User>;
};

export type ToggleGptBotCrawlingInput = {
  publicationId: Scalars['ID']['input'];
};

export type ToggleGptBotCrawlingPayload = {
  __typename?: 'ToggleGPTBotCrawlingPayload';
  publication?: Maybe<Publication>;
};

/** Response to toggling role based invite links. */
export type ToggleRoleBasedInviteLinksPayload = {
  __typename?: 'ToggleRoleBasedInviteLinksPayload';
  /** Signifies the status of invite links after toggling. */
  areRoleBasedInviteLinksActive: Scalars['Boolean']['output'];
};

export type ToggleTextSelectionSharerInput = {
  publicationId: Scalars['ID']['input'];
};

export type ToggleTextSelectionSharerPayload = {
  __typename?: 'ToggleTextSelectionSharerPayload';
  publication?: Maybe<Publication>;
};

export type TriggerWebhookTestInput = {
  webhookId: Scalars['ID']['input'];
};

export type TriggerWebhookTestPayload = {
  __typename?: 'TriggerWebhookTestPayload';
  webhook?: Maybe<Webhook>;
};

/** Views implementation that will be returned if no grouping is applied. */
export type UngroupedViews = Node & Views & {
  __typename?: 'UngroupedViews';
  id: Scalars['ID']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

/** Visitors implementation that will be returned if no grouping is applied. */
export type UngroupedVisitors = Node & Visitors & {
  __typename?: 'UngroupedVisitors';
  id: Scalars['ID']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

export type UnsubscribeFromNewsletterInput = {
  /** The email that is currently subscribed. */
  email: Scalars['String']['input'];
  /** The ID of the publication to unsubscribe from. */
  publicationId: Scalars['ObjectId']['input'];
};

export type UnsubscribeFromNewsletterPayload = {
  __typename?: 'UnsubscribeFromNewsletterPayload';
  status?: Maybe<NewsletterUnsubscribeStatus>;
};

export type UpdateCommentInput = {
  contentMarkdown: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateCommentPayload = {
  __typename?: 'UpdateCommentPayload';
  comment?: Maybe<Comment>;
};

export type UpdatePostInput = {
  /**
   * Update co-authors of the post.
   * Must be a member of the publication.
   */
  coAuthors?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
  /** The publication the post is published to. */
  contentMarkdown?: InputMaybe<Scalars['String']['input']>;
  /** Options for the cover image of the post. */
  coverImageOptions?: InputMaybe<CoverImageOptionsInput>;
  /** The id of the post to update. */
  id: Scalars['ID']['input'];
  /** Information about the meta tags added to the post, used for SEO purpose. */
  metaTags?: InputMaybe<MetaTagsInput>;
  /** Canonical URL of the original article. */
  originalArticleURL?: InputMaybe<Scalars['String']['input']>;
  /** If the publication should be changed this is the new Publication ID */
  publicationId?: InputMaybe<Scalars['ObjectId']['input']>;
  /**
   * Set a different author for the post than the requesting user.
   * Must be a member of the publication.
   */
  publishAs?: InputMaybe<Scalars['ObjectId']['input']>;
  /** Backdated publish date. */
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   * Providing a seriesId will add the post to that series.
   * Must be a series of the publication.
   */
  seriesId?: InputMaybe<Scalars['ObjectId']['input']>;
  /** Whether or not to enable the table of content. */
  settings?: InputMaybe<UpdatePostSettingsInput>;
  /** Slug of the post. Only if you want to override the slug that will be generated based on the title. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The subtitle of the post */
  subtitle?: InputMaybe<Scalars['String']['input']>;
  /** Tags to add to the post. New tags will be created if they don't exist. It overrides the existing tags. */
  tags?: InputMaybe<Array<PublishPostTagInput>>;
  /** The new title of the post */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  post?: Maybe<Post>;
};

export type UpdatePostSettingsInput = {
  /** A flag to indicate if the post is delisted, used to hide the post from public feed. */
  delisted?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether or not comments should be disabled. */
  disableComments?: InputMaybe<Scalars['Boolean']['input']>;
  /** A flag to indicate if the post contains table of content */
  isTableOfContentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Pin the post to the blog homepage. */
  pinToBlog?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateRedirectionRuleInput = {
  destination?: InputMaybe<Scalars['URL']['input']>;
  id: Scalars['ID']['input'];
  publicationId: Scalars['ID']['input'];
  source?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<HttpRedirectionType>;
};

export type UpdateRedirectionRulePayload = {
  __typename?: 'UpdateRedirectionRulePayload';
  redirectionRule: RedirectionRule;
};

export type UpdateReplyInput = {
  commentId: Scalars['ID']['input'];
  contentMarkdown: Scalars['String']['input'];
  replyId: Scalars['ID']['input'];
};

export type UpdateReplyPayload = {
  __typename?: 'UpdateReplyPayload';
  reply?: Maybe<Reply>;
};

/** Input to update a role based invite. */
export type UpdateRoleBasedInviteInput = {
  /** The capacity of how many members to be invited by the link. */
  capacity?: InputMaybe<Scalars['Int']['input']>;
  /** Boolean to enable unlimited capacity. */
  enableUnlimitedCapacity?: InputMaybe<Scalars['Boolean']['input']>;
  /** The expiry date of the invite. */
  expiryDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The ID of the role based invite. */
  inviteId: Scalars['ID']['input'];
  publicationId: Scalars['ID']['input'];
  /** The role to assign to the user in the publication. */
  role?: InputMaybe<UserPublicationInviteRole>;
};

/** Response to updating a role based invite for a publication. */
export type UpdateRoleBasedInvitePayload = {
  __typename?: 'UpdateRoleBasedInvitePayload';
  /** The updated role based invite. */
  invite: RoleBasedInvite;
};

export type UpdateSeriesInput = {
  /** The cover image of the series. */
  coverImage?: InputMaybe<Scalars['String']['input']>;
  /** The description of the series. Accepts markdown. */
  descriptionMarkdown?: InputMaybe<Scalars['String']['input']>;
  /** The id of the series to update. */
  id: Scalars['ID']['input'];
  /** The name of the series. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the series. Used to access series page.  Example https://johndoe.com/series/series-slug */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The sort order of the series, determines if the latest posts should appear first or last in series. */
  sortOrder?: InputMaybe<SortOrder>;
};

export type UpdateSeriesPayload = {
  __typename?: 'UpdateSeriesPayload';
  /** Returns the updated series. */
  series: Series;
};

export type UpdateWebhookInput = {
  events?: InputMaybe<Array<WebhookEvent>>;
  id: Scalars['ID']['input'];
  secret?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWebhookPayload = {
  __typename?: 'UpdateWebhookPayload';
  webhook?: Maybe<Webhook>;
};

export enum UrlPattern {
  /** Post URLs contain the slug (for example `my slug`) and a random id (like `1234`) , e.g. "/my-slug-1234". */
  Default = 'DEFAULT',
  /** Post URLs only contain the slug, e.g. "/my-slug". */
  Simple = 'SIMPLE'
}

/** Basic information about a user on Hashnode. */
export type User = IUser & Node & {
  __typename?: 'User';
  /**
   * Whether or not the user is an ambassador.
   * @deprecated Ambassadors program no longer active. Will be removed after 02/01/2024
   */
  ambassador: Scalars['Boolean']['output'];
  /** The availability of the user based on tech stack and interests. Shown on the "I am available for" section in user's profile. */
  availableFor?: Maybe<Scalars['String']['output']>;
  /** Returns a list of badges that the user has earned. Shown on blogs /badges page. Example - https://iamshadmirza.com/badges */
  badges: Array<Badge>;
  /** The bio of the user. Visible in about me section of the user's profile. */
  bio?: Maybe<Content>;
  /**
   * The bio of the user. Visible in about me section of the user's profile.
   * @deprecated Will be removed on 26/10/2023. Use bio instead of bioV2
   */
  bioV2?: Maybe<Content>;
  /** The date the user joined Hashnode. */
  dateJoined?: Maybe<Scalars['DateTime']['output']>;
  /** Whether or not the user is deactivated. */
  deactivated: Scalars['Boolean']['output'];
  /** The users who are following this user */
  followers: UserConnection;
  /** The number of users that follow the requested user. Visible in the user's profile. */
  followersCount: Scalars['Int']['output'];
  /**
   * Whether or not the authenticated user follows this user.
   * Returns false if the authenticated user this user.
   */
  following: Scalars['Boolean']['output'];
  /** The number of users that this user is following. Visible in the user's profile. */
  followingsCount: Scalars['Int']['output'];
  /** The users which this user is following */
  follows: UserConnection;
  /**
   * Whether or not this user follows the authenticated user.
   * Returns false if the authenticated user this user.
   */
  followsBack: Scalars['Boolean']['output'];
  /** The ID of the user. It can be used to identify the user. */
  id: Scalars['ID']['output'];
  /** Whether or not this is a pro user. */
  isPro: Scalars['Boolean']['output'];
  /** The location of the user. */
  location?: Maybe<Scalars['String']['output']>;
  /** The name of the user. */
  name: Scalars['String']['output'];
  /** Returns the list of posts the user has published. */
  posts: UserPostConnection;
  /** The URL to the profile picture of the user. */
  profilePicture?: Maybe<Scalars['String']['output']>;
  /** Publications associated with the user. Includes personal and team publications. */
  publications: UserPublicationsConnection;
  /** The social media links of the user. Shown on the user's profile. */
  socialMediaLinks?: Maybe<SocialMediaLinks>;
  /** The tagline of the user. Shown on the user's profile below the name. */
  tagline?: Maybe<Scalars['String']['output']>;
  /** Returns a list of tags that the user follows. */
  tagsFollowing: Array<Tag>;
  /** The username of the user. It is unique and tied with user's profile URL. Example - https://hashnode.com/@username */
  username: Scalars['String']['output'];
};


/** Basic information about a user on Hashnode. */
export type UserFollowersArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/** Basic information about a user on Hashnode. */
export type UserFollowsArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


/** Basic information about a user on Hashnode. */
export type UserPostsArgs = {
  filter?: InputMaybe<UserPostConnectionFilter>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortBy?: InputMaybe<UserPostsSort>;
};


/** Basic information about a user on Hashnode. */
export type UserPublicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<UserPublicationsConnectionFilter>;
  first: Scalars['Int']['input'];
};

/**
 * Connection for users to another user. Contains a list of nodes.
 * Each node is a user.
 * Page info contains information about pagination like hasNextPage and endCursor.
 */
export type UserConnection = PageConnection & {
  __typename?: 'UserConnection';
  /** A list of users */
  nodes: Array<User>;
  /** Information for page based pagination in users connection. */
  pageInfo: OffsetPageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/** Drafts that belong to a user. */
export type UserDraftConnection = Connection & {
  __typename?: 'UserDraftConnection';
  /** A list of edges. */
  edges: Array<UserDraftEdge>;
  /** Generic information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/** A generic type which holds a draft during pagination. */
export type UserDraftEdge = Edge & {
  __typename?: 'UserDraftEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of UserDraftEdge. */
  node: Draft;
};

/** Contains a node of type user and cursor for pagination. */
export type UserEdge = Edge & {
  __typename?: 'UserEdge';
  /** The cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The node containing User information */
  node: User;
};

export type UserInviteInput = {
  /** The email of the user to invite to the publication. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The role to assign to the user in the publication. */
  role: UserPublicationInviteRole;
  /** Username of the user to invite to the publication. */
  username?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Connection for posts written by a single user. Contains a list of edges containing nodes.
 * Each node is a post.
 * Page info contains information about pagination like hasNextPage and endCursor.
 */
export type UserPostConnection = PageConnection & {
  __typename?: 'UserPostConnection';
  /** A list of edges containing Post information */
  edges: Array<UserPostEdge>;
  /** A list of posts */
  nodes: Array<Post>;
  /** Information for page based pagination in Post connection. */
  pageInfo: OffsetPageInfo;
  /** The total number of documents in the connection. */
  totalDocuments: Scalars['Int']['output'];
};

/** Filter for the posts of a user. */
export type UserPostConnectionFilter = {
  /** Filtering by author status. Either all posts the user has authored or co-authored are returned or the authored posts only. */
  authorType?: InputMaybe<UserPostsAuthorTypeFilter>;
  /** Filtering by publication IDs will return posts from the author within the publication. */
  publications?: InputMaybe<Array<Scalars['ID']['input']>>;
  /**
   * Only include posts that reference the provided tag slugs.
   *
   * Filtering by `tags` and `tagSlugs` will filter posts that match either of those two filters.
   */
  tagSlugs?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * Only include posts that reference the provided tag IDs.
   *
   *
   * Filtering by `tags` and `tagSlugs` will filter posts that match either of those two filters.
   */
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Contains a post and the author status. */
export type UserPostEdge = {
  __typename?: 'UserPostEdge';
  /** Indicates weather the user is the author or co-author of the post. */
  authorType: PostAuthorType;
  /** The node holding the Post information. */
  node: Post;
};

/** Filter for the posts of a user. */
export enum UserPostsAuthorTypeFilter {
  /** Only posts that are authored by the user. */
  AuthorOnly = 'AUTHOR_ONLY',
  /** Only posts that are co-authored by the user. */
  CoAuthorOnly = 'CO_AUTHOR_ONLY'
}

/** Sorting for the posts of a user. */
export enum UserPostsSort {
  /** Oldest posts first. */
  DatePublishedAsc = 'DATE_PUBLISHED_ASC',
  /** Newest posts first. */
  DatePublishedDesc = 'DATE_PUBLISHED_DESC'
}

/** The invited role of the user in the publication. */
export enum UserPublicationInviteRole {
  /** Contributors can join the publication and contribute an article. They cannot directly publish a new article. */
  Contributor = 'CONTRIBUTOR',
  /**
   * The editor has access to the publication dashboard to customize the blog and approve/reject posts.
   * They also have access to the member panel to add/modify/remove members. Editors cannot remove other editors or update their roles.
   */
  Editor = 'EDITOR'
}

/** The role of the user in the publication. */
export enum UserPublicationRole {
  /** Contributors can join the publication and contribute an article. They cannot directly publish a new article. */
  Contributor = 'CONTRIBUTOR',
  /**
   * The editor has access to the publication dashboard to customize the blog and approve/reject posts.
   * They also have access to the member panel to add/modify/remove members. Editors cannot remove other editors or update their roles.
   */
  Editor = 'EDITOR',
  /** The owner is the creator of the publication and can do all things, including delete publication. */
  Owner = 'OWNER'
}

/**
 * Connection to get list of publications.
 * Returns a list of edges which contains the publications and cursor to the last item of the previous page.
 */
export type UserPublicationsConnection = Connection & {
  __typename?: 'UserPublicationsConnection';
  /** A list of edges of publications connection. */
  edges: Array<UserPublicationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of publications taking into account the filter. */
  totalDocuments: Scalars['Int']['output'];
};

/** Filter to apply to the publications. */
export type UserPublicationsConnectionFilter = {
  /** Only return pro publications. */
  isPro?: InputMaybe<Scalars['Boolean']['input']>;
  /** Only include publication in which the user has one of the provided roles. */
  roles?: InputMaybe<Array<UserPublicationRole>>;
};

/** An edge that contains a node of type publication and cursor to the node. */
export type UserPublicationsEdge = Edge & {
  __typename?: 'UserPublicationsEdge';
  /** The cursor to the node. */
  cursor: Scalars['String']['output'];
  /** Node containing the publication. */
  node: Publication;
  /** The role of the user in the publication. */
  role: UserPublicationRole;
};

export type UserRecommendedPublicationEdge = {
  __typename?: 'UserRecommendedPublicationEdge';
  /** The publication that is recommended by the publication this connection originates from. */
  node: Publication;
  /** The amount of followers the publication referenced in `node` has gained by recommendations from the publication. */
  totalFollowersGained: Scalars['Int']['output'];
};

export type UserRecommendingPublicationEdge = {
  __typename?: 'UserRecommendingPublicationEdge';
  /** The publication that is recommending the publication this connection originates from. */
  node: Publication;
  /** The amount of followers the publication has gained by recommendations from the publication referenced in `node`. */
  totalFollowersGained: Scalars['Int']['output'];
};

/** Role of the user within Hashnode */
export enum UserRole {
  Moderator = 'MODERATOR',
  Superuser = 'SUPERUSER',
  User = 'USER'
}

export enum ValidationMethod {
  Id = 'ID'
}

/**
 * Contains the flag indicating if the view count feature is enabled or not.
 * User can enable or disable the view count feature from the publication settings.
 * Shows total views on blogs if enabled.
 */
export type ViewCountFeature = Feature & {
  __typename?: 'ViewCountFeature';
  /** A flag indicating if the view count feature is enabled or not. */
  isEnabled: Scalars['Boolean']['output'];
};

export type Views = {
  id: Scalars['ID']['output'];
  /** The aggregated views. */
  total: Scalars['Int']['output'];
};

export type Visitors = {
  id: Scalars['ID']['output'];
  /** The aggregated number of visitors. */
  total: Scalars['Int']['output'];
};

export type Webhook = Node & {
  __typename?: 'Webhook';
  createdAt: Scalars['DateTime']['output'];
  events: Array<WebhookEvent>;
  /** The ID of the post. Used to uniquely identify the post. */
  id: Scalars['ID']['output'];
  /**
   * Messages that has been sent via this webhook.
   * Messages include the request and eventual response.
   */
  messages: WebhookMessageConnection;
  publication: Publication;
  secret: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
};


export type WebhookMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
};

export enum WebhookEvent {
  PostDeleted = 'POST_DELETED',
  PostPublished = 'POST_PUBLISHED',
  PostUpdated = 'POST_UPDATED',
  StaticPageDeleted = 'STATIC_PAGE_DELETED',
  StaticPageEdited = 'STATIC_PAGE_EDITED',
  StaticPagePublished = 'STATIC_PAGE_PUBLISHED'
}

export type WebhookMessage = Node & {
  __typename?: 'WebhookMessage';
  createdAt: Scalars['DateTime']['output'];
  event: WebhookEvent;
  id: Scalars['ID']['output'];
  /** True if either the request failed or the response status code was not 2xx. */
  isError: Scalars['Boolean']['output'];
  /** True if the message was resent. */
  isResent: Scalars['Boolean']['output'];
  /** True if the message was sent as a test. */
  isTest: Scalars['Boolean']['output'];
  request: WebhookMessageRequest;
  response?: Maybe<WebhookMessageResponse>;
  url: Scalars['String']['output'];
};

export type WebhookMessageConnection = Connection & {
  __typename?: 'WebhookMessageConnection';
  edges: Array<WebhookMessageEdge>;
  pageInfo: PageInfo;
};

export type WebhookMessageEdge = Edge & {
  __typename?: 'WebhookMessageEdge';
  cursor: Scalars['String']['output'];
  node: WebhookMessage;
};

export type WebhookMessageRequest = {
  __typename?: 'WebhookMessageRequest';
  body: Scalars['String']['output'];
  error?: Maybe<WebhookMessageRequestError>;
  headers: Scalars['String']['output'];
  /** Unique identifier of the request. Can be used to deduplicate requests. */
  uuid: Scalars['String']['output'];
};

export type WebhookMessageRequestError = {
  __typename?: 'WebhookMessageRequestError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type WebhookMessageResponse = {
  __typename?: 'WebhookMessageResponse';
  body?: Maybe<Scalars['String']['output']>;
  headers?: Maybe<Scalars['String']['output']>;
  httpStatus: Scalars['Int']['output'];
  /** The time it took from the moment the request has been send until the first byte of the response has been received. */
  timeToFirstByteMilliseconds?: Maybe<Scalars['Int']['output']>;
};

export type Widget = Node & {
  __typename?: 'Widget';
  /** Content of the widget, can be a simple string or HTML */
  content: Scalars['String']['output'];
  /** The date and time the widget was created. */
  createdAt: Scalars['DateTime']['output'];
  /** The unique identifier of the widget */
  id: Scalars['ID']['output'];
  pinSettings?: Maybe<WidgetPinSettings>;
  /** WidgetId, can be embedded as %%[widgetId] in the article */
  widgetId: Scalars['String']['output'];
};

export enum WidgetPinLocation {
  Bottom = 'BOTTOM',
  Top = 'TOP'
}

export type WidgetPinSettings = {
  __typename?: 'WidgetPinSettings';
  /** Signifies if pinning of widget on all the articles of publication is enabled or not */
  isPinned: Scalars['Boolean']['output'];
  /** Describes the location of the widget on the article, can be TOP or BOTTOM */
  location: WidgetPinLocation;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  DraftTag: ( DraftBaseTag ) | ( Tag );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Connection: ( Omit<CommentReplyConnection, 'edges'> & { edges: Array<_RefType['CommentReplyEdge']> } ) | ( Omit<CommenterUserConnection, 'edges'> & { edges: Array<_RefType['UserEdge']> } ) | ( Omit<DraftConnection, 'edges'> & { edges: Array<_RefType['DraftEdge']> } ) | ( FeedPostConnection ) | ( PostCommentConnection ) | ( PostCommenterConnection ) | ( PostLikerConnection ) | ( PublicationPostConnection ) | ( SearchPostConnection ) | ( SeriesConnection ) | ( SeriesPostConnection ) | ( StaticPageConnection ) | ( Omit<UserDraftConnection, 'edges'> & { edges: Array<_RefType['UserDraftEdge']> } ) | ( Omit<UserPublicationsConnection, 'edges'> & { edges: Array<_RefType['UserPublicationsEdge']> } ) | ( WebhookMessageConnection );
  Edge: ( Omit<CommentReplyEdge, 'node'> & { node: _RefType['Reply'] } ) | ( Omit<DraftEdge, 'node'> & { node: _RefType['Draft'] } ) | ( DraftRevisionEdge ) | ( PopularTagEdge ) | ( Omit<PostCommentEdge, 'node'> & { node: _RefType['Comment'] } ) | ( Omit<PostCommenterEdge, 'node'> & { node: _RefType['User'] } ) | ( Omit<PostEdge, 'node'> & { node: _RefType['Post'] } ) | ( Omit<PostLikerEdge, 'node'> & { node: _RefType['User'] } ) | ( Omit<PublicationViewEdge, 'node'> & { node: _RefType['Views'] } ) | ( Omit<PublicationVisitorsEdge, 'node'> & { node: _RefType['Visitors'] } ) | ( Omit<RecommendedPublicationEdge, 'node'> & { node: _RefType['Publication'] } ) | ( SeriesEdge ) | ( StaticPageEdge ) | ( TagEdge ) | ( Omit<UserDraftEdge, 'node'> & { node: _RefType['Draft'] } ) | ( Omit<UserEdge, 'node'> & { node: _RefType['User'] } ) | ( Omit<UserPublicationsEdge, 'node'> & { node: _RefType['Publication'] } ) | ( WebhookMessageEdge );
  Feature: ( AudioBlogFeature ) | ( CustomCssFeature ) | ( GptBotCrawlingFeature ) | ( HeadlessCmsFeature ) | ( NewsletterFeature ) | ( PostBadgesFeature ) | ( ProTeamFeature ) | ( ReadTimeFeature ) | ( TableOfContentsFeature ) | ( TextSelectionSharerFeature ) | ( ViewCountFeature );
  ITag: ( PopularTag ) | ( Tag );
  IUser: ( Omit<MyUser, 'badges' | 'drafts' | 'posts' | 'publications'> & { badges: Array<_RefType['Badge']>, drafts: _RefType['UserDraftConnection'], posts: _RefType['UserPostConnection'], publications: _RefType['UserPublicationsConnection'] } ) | ( Omit<User, 'badges' | 'posts' | 'publications'> & { badges: Array<_RefType['Badge']>, posts: _RefType['UserPostConnection'], publications: _RefType['UserPublicationsConnection'] } );
  Node: ( Badge ) | ( BetaFeature ) | ( Omit<Comment, 'author' | 'replies'> & { author: _RefType['User'], replies: _RefType['CommentReplyConnection'] } ) | ( Omit<Draft, 'author' | 'coAuthors' | 'coverImage' | 'publication' | 'publishAs' | 'tagsV2'> & { author: _RefType['User'], coAuthors?: Maybe<Array<_RefType['User']>>, coverImage?: Maybe<_RefType['DraftCoverImage']>, publication?: Maybe<_RefType['Publication']>, publishAs?: Maybe<_RefType['User']>, tagsV2: Array<_RefType['DraftTag']> } ) | ( DraftRevision ) | ( GroupedByBrowserViews ) | ( GroupedByBrowserVisitors ) | ( GroupedByCountryViews ) | ( GroupedByCountryVisitors ) | ( GroupedByDeviceTypeViews ) | ( GroupedByDeviceTypeVisitors ) | ( GroupedByOperatingSystemViews ) | ( GroupedByOperatingSystemVisitors ) | ( GroupedByPageViews ) | ( GroupedByPageVisitors ) | ( GroupedByPathViews ) | ( GroupedByPathVisitors ) | ( Omit<GroupedByPostViews, 'post'> & { post: _RefType['Post'] } ) | ( Omit<GroupedByPostVisitors, 'post'> & { post: _RefType['Post'] } ) | ( GroupedByReferrerHostViews ) | ( GroupedByReferrerHostVisitors ) | ( GroupedByTimeViews ) | ( GroupedByTimeVisitors ) | ( Omit<MyUser, 'badges' | 'drafts' | 'posts' | 'publications'> & { badges: Array<_RefType['Badge']>, drafts: _RefType['UserDraftConnection'], posts: _RefType['UserPostConnection'], publications: _RefType['UserPublicationsConnection'] } ) | ( Omit<NewsletterRecord, 'post'> & { post?: Maybe<_RefType['Post']> } ) | ( NewsletterSubscriber ) | ( Omit<PendingInvite, 'user'> & { user?: Maybe<_RefType['User']> } ) | ( PopularTag ) | ( Omit<Post, 'audioUrls' | 'author' | 'coAuthors' | 'contributors' | 'publication'> & { audioUrls?: Maybe<_RefType['AudioUrls']>, author: _RefType['User'], coAuthors?: Maybe<Array<_RefType['User']>>, contributors: Array<_RefType['User']>, publication?: Maybe<_RefType['Publication']> } ) | ( PostBadge ) | ( Omit<Publication, 'allDrafts' | 'allScheduledDrafts' | 'author' | 'drafts' | 'pinnedPost' | 'post' | 'recommendedPublications' | 'recommendingPublications' | 'redirectedPost' | 'scheduledDrafts' | 'submittedDrafts'> & { allDrafts: _RefType['DraftConnection'], allScheduledDrafts: _RefType['DraftConnection'], author: _RefType['User'], drafts: _RefType['DraftConnection'], pinnedPost?: Maybe<_RefType['Post']>, post?: Maybe<_RefType['Post']>, recommendedPublications: Array<_RefType['UserRecommendedPublicationEdge']>, recommendingPublications: _RefType['PublicationUserRecommendingPublicationConnection'], redirectedPost?: Maybe<_RefType['Post']>, scheduledDrafts: _RefType['DraftConnection'], submittedDrafts: _RefType['DraftConnection'] } ) | ( Omit<PublicationMember, 'user'> & { user?: Maybe<_RefType['User']> } ) | ( RssImport ) | ( RedirectionRule ) | ( Omit<Reply, 'author'> & { author: _RefType['User'] } ) | ( RoleBasedInvite ) | ( Omit<ScheduledPost, 'author' | 'draft' | 'publication' | 'scheduledBy'> & { author: _RefType['User'], draft?: Maybe<_RefType['Draft']>, publication: _RefType['Publication'], scheduledBy?: Maybe<_RefType['User']> } ) | ( Omit<SearchUser, 'user'> & { user: _RefType['User'] } ) | ( Omit<Series, 'author'> & { author: _RefType['User'] } ) | ( StaticPage ) | ( TableOfContentsItem ) | ( Tag ) | ( UngroupedViews ) | ( UngroupedVisitors ) | ( Omit<User, 'badges' | 'posts' | 'publications'> & { badges: Array<_RefType['Badge']>, posts: _RefType['UserPostConnection'], publications: _RefType['UserPublicationsConnection'] } ) | ( Omit<Webhook, 'publication'> & { publication: _RefType['Publication'] } ) | ( WebhookMessage ) | ( Widget );
  PageConnection: ( PendingInviteConnection ) | ( Omit<PublicationPostPageConnection, 'nodes'> & { nodes: Array<_RefType['Post']> } ) | ( Omit<PublicationUserRecommendingPublicationConnection, 'edges' | 'nodes'> & { edges: Array<_RefType['UserRecommendingPublicationEdge']>, nodes: Array<_RefType['Publication']> } ) | ( RoleBasedInviteConnection ) | ( Omit<UserConnection, 'nodes'> & { nodes: Array<_RefType['User']> } ) | ( Omit<UserPostConnection, 'edges' | 'nodes'> & { edges: Array<_RefType['UserPostEdge']>, nodes: Array<_RefType['Post']> } );
  Views: ( GroupedByBrowserViews ) | ( GroupedByCountryViews ) | ( GroupedByDeviceTypeViews ) | ( GroupedByOperatingSystemViews ) | ( GroupedByPageViews ) | ( GroupedByPathViews ) | ( Omit<GroupedByPostViews, 'post'> & { post: _RefType['Post'] } ) | ( GroupedByReferrerHostViews ) | ( GroupedByTimeViews ) | ( UngroupedViews );
  Visitors: ( GroupedByBrowserVisitors ) | ( GroupedByCountryVisitors ) | ( GroupedByDeviceTypeVisitors ) | ( GroupedByOperatingSystemVisitors ) | ( GroupedByPageVisitors ) | ( GroupedByPathVisitors ) | ( Omit<GroupedByPostVisitors, 'post'> & { post: _RefType['Post'] } ) | ( GroupedByReferrerHostVisitors ) | ( GroupedByTimeVisitors ) | ( UngroupedVisitors );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AcceptInviteToPublicationInput: AcceptInviteToPublicationInput;
  AcceptInviteToPublicationPayload: ResolverTypeWrapper<AcceptInviteToPublicationPayload>;
  AcceptRoleBasedInviteInput: AcceptRoleBasedInviteInput;
  AcceptRoleBasedInvitePayload: ResolverTypeWrapper<AcceptRoleBasedInvitePayload>;
  AddCommentInput: AddCommentInput;
  AddCommentPayload: ResolverTypeWrapper<Omit<AddCommentPayload, 'comment'> & { comment?: Maybe<ResolversTypes['Comment']> }>;
  AddPostToSeriesInput: AddPostToSeriesInput;
  AddPostToSeriesPayload: ResolverTypeWrapper<AddPostToSeriesPayload>;
  AddReplyInput: AddReplyInput;
  AddReplyPayload: ResolverTypeWrapper<Omit<AddReplyPayload, 'reply'> & { reply?: Maybe<ResolversTypes['Reply']> }>;
  AudioBlogFeature: ResolverTypeWrapper<AudioBlogFeature>;
  AudioBlogVoiceType: AudioBlogVoiceType;
  AudioUrls: ResolverTypeWrapper<AudioUrls>;
  BackupStatus: BackupStatus;
  Badge: ResolverTypeWrapper<Badge>;
  BetaFeature: ResolverTypeWrapper<BetaFeature>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CancelScheduledDraftInput: CancelScheduledDraftInput;
  CancelScheduledDraftPayload: ResolverTypeWrapper<Omit<CancelScheduledDraftPayload, 'scheduledPost'> & { scheduledPost: ResolversTypes['ScheduledPost'] }>;
  ChangePublicationMemberRoleInput: ChangePublicationMemberRoleInput;
  ChangePublicationMemberRolePayload: ResolverTypeWrapper<Omit<ChangePublicationMemberRolePayload, 'member'> & { member: ResolversTypes['PublicationMember'] }>;
  ChangePublicationMemberVisibilityInput: ChangePublicationMemberVisibilityInput;
  ChangePublicationMemberVisibilityPayload: ResolverTypeWrapper<Omit<ChangePublicationMemberVisibilityPayload, 'member'> & { member: ResolversTypes['PublicationMember'] }>;
  Comment: ResolverTypeWrapper<Omit<Comment, 'author' | 'replies'> & { author: ResolversTypes['User'], replies: ResolversTypes['CommentReplyConnection'] }>;
  CommentReplyConnection: ResolverTypeWrapper<Omit<CommentReplyConnection, 'edges'> & { edges: Array<ResolversTypes['CommentReplyEdge']> }>;
  CommentReplyEdge: ResolverTypeWrapper<Omit<CommentReplyEdge, 'node'> & { node: ResolversTypes['Reply'] }>;
  CommenterUserConnection: ResolverTypeWrapper<Omit<CommenterUserConnection, 'edges'> & { edges: Array<ResolversTypes['UserEdge']> }>;
  Connection: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Connection']>;
  Content: ResolverTypeWrapper<Content>;
  CountryCodeAlpha2: CountryCodeAlpha2;
  CoverImageOptionsInput: CoverImageOptionsInput;
  CreateDraftInput: CreateDraftInput;
  CreateDraftPayload: ResolverTypeWrapper<Omit<CreateDraftPayload, 'draft'> & { draft?: Maybe<ResolversTypes['Draft']> }>;
  CreateDraftSettingsInput: CreateDraftSettingsInput;
  CreateDraftTagInput: CreateDraftTagInput;
  CreateRedirectionRuleInput: CreateRedirectionRuleInput;
  CreateRedirectionRulePayload: ResolverTypeWrapper<CreateRedirectionRulePayload>;
  CreateRoleBasedInviteForPublicationInput: CreateRoleBasedInviteForPublicationInput;
  CreateRoleBasedInviteForPublicationPayload: ResolverTypeWrapper<CreateRoleBasedInviteForPublicationPayload>;
  CreateSeriesInput: CreateSeriesInput;
  CreateSeriesPayload: ResolverTypeWrapper<CreateSeriesPayload>;
  CreateWebhookInput: CreateWebhookInput;
  CreateWebhookPayload: ResolverTypeWrapper<Omit<CreateWebhookPayload, 'webhook'> & { webhook?: Maybe<ResolversTypes['Webhook']> }>;
  CustomCSS: ResolverTypeWrapper<CustomCss>;
  CustomCSSFeature: ResolverTypeWrapper<CustomCssFeature>;
  CustomDomainStatus: CustomDomainStatus;
  DarkModePreferences: ResolverTypeWrapper<DarkModePreferences>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteRoleBasedInviteInput: DeleteRoleBasedInviteInput;
  DeleteRoleBasedInvitePayload: ResolverTypeWrapper<DeleteRoleBasedInvitePayload>;
  DeleteWebhookPayload: ResolverTypeWrapper<Omit<DeleteWebhookPayload, 'webhook'> & { webhook?: Maybe<ResolversTypes['Webhook']> }>;
  DeviceType: DeviceType;
  DomainInfo: ResolverTypeWrapper<DomainInfo>;
  DomainStatus: ResolverTypeWrapper<DomainStatus>;
  Draft: ResolverTypeWrapper<Omit<Draft, 'author' | 'coAuthors' | 'coverImage' | 'publication' | 'publishAs' | 'tagsV2'> & { author: ResolversTypes['User'], coAuthors?: Maybe<Array<ResolversTypes['User']>>, coverImage?: Maybe<ResolversTypes['DraftCoverImage']>, publication?: Maybe<ResolversTypes['Publication']>, publishAs?: Maybe<ResolversTypes['User']>, tagsV2: Array<ResolversTypes['DraftTag']> }>;
  DraftBackup: ResolverTypeWrapper<DraftBackup>;
  DraftBaseTag: ResolverTypeWrapper<DraftBaseTag>;
  DraftConnection: ResolverTypeWrapper<Omit<DraftConnection, 'edges'> & { edges: Array<ResolversTypes['DraftEdge']> }>;
  DraftCoverImage: ResolverTypeWrapper<DraftCoverImage>;
  DraftEdge: ResolverTypeWrapper<Omit<DraftEdge, 'node'> & { node: ResolversTypes['Draft'] }>;
  DraftFeatures: ResolverTypeWrapper<DraftFeatures>;
  DraftRevision: ResolverTypeWrapper<DraftRevision>;
  DraftRevisionEdge: ResolverTypeWrapper<DraftRevisionEdge>;
  DraftSettings: ResolverTypeWrapper<DraftSettings>;
  DraftTag: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['DraftTag']>;
  Edge: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Edge']>;
  EmailCurrentImport: ResolverTypeWrapper<EmailCurrentImport>;
  EmailImport: ResolverTypeWrapper<EmailImport>;
  EmailImportStatus: EmailImportStatus;
  FailedInvite: ResolverTypeWrapper<FailedInvite>;
  Feature: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Feature']>;
  FeedFilter: FeedFilter;
  FeedPostConnection: ResolverTypeWrapper<FeedPostConnection>;
  FeedType: FeedType;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GPTBotCrawlingFeature: ResolverTypeWrapper<GptBotCrawlingFeature>;
  GroupedByBrowserViews: ResolverTypeWrapper<GroupedByBrowserViews>;
  GroupedByBrowserVisitors: ResolverTypeWrapper<GroupedByBrowserVisitors>;
  GroupedByCountryViews: ResolverTypeWrapper<GroupedByCountryViews>;
  GroupedByCountryVisitors: ResolverTypeWrapper<GroupedByCountryVisitors>;
  GroupedByDeviceTypeViews: ResolverTypeWrapper<GroupedByDeviceTypeViews>;
  GroupedByDeviceTypeVisitors: ResolverTypeWrapper<GroupedByDeviceTypeVisitors>;
  GroupedByOperatingSystemViews: ResolverTypeWrapper<GroupedByOperatingSystemViews>;
  GroupedByOperatingSystemVisitors: ResolverTypeWrapper<GroupedByOperatingSystemVisitors>;
  GroupedByPageViews: ResolverTypeWrapper<GroupedByPageViews>;
  GroupedByPageVisitors: ResolverTypeWrapper<GroupedByPageVisitors>;
  GroupedByPathViews: ResolverTypeWrapper<GroupedByPathViews>;
  GroupedByPathVisitors: ResolverTypeWrapper<GroupedByPathVisitors>;
  GroupedByPostViews: ResolverTypeWrapper<Omit<GroupedByPostViews, 'post'> & { post: ResolversTypes['Post'] }>;
  GroupedByPostVisitors: ResolverTypeWrapper<Omit<GroupedByPostVisitors, 'post'> & { post: ResolversTypes['Post'] }>;
  GroupedByReferrerHostViews: ResolverTypeWrapper<GroupedByReferrerHostViews>;
  GroupedByReferrerHostVisitors: ResolverTypeWrapper<GroupedByReferrerHostVisitors>;
  GroupedByTimeViews: ResolverTypeWrapper<GroupedByTimeViews>;
  GroupedByTimeVisitors: ResolverTypeWrapper<GroupedByTimeVisitors>;
  HeadlessCMSFeature: ResolverTypeWrapper<HeadlessCmsFeature>;
  HttpRedirectionType: HttpRedirectionType;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ITag: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ITag']>;
  IUser: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['IUser']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  InviteUsersToPublicationInput: InviteUsersToPublicationInput;
  InviteUsersToPublicationPayload: ResolverTypeWrapper<InviteUsersToPublicationPayload>;
  LikeCommentInput: LikeCommentInput;
  LikeCommentPayload: ResolverTypeWrapper<Omit<LikeCommentPayload, 'comment'> & { comment?: Maybe<ResolversTypes['Comment']> }>;
  LikePostInput: LikePostInput;
  LikePostPayload: ResolverTypeWrapper<Omit<LikePostPayload, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  LikeReplyInput: LikeReplyInput;
  LikeReplyPayload: ResolverTypeWrapper<Omit<LikeReplyPayload, 'reply'> & { reply?: Maybe<ResolversTypes['Reply']> }>;
  MetaTagsInput: MetaTagsInput;
  Mutation: ResolverTypeWrapper<{}>;
  MyUser: ResolverTypeWrapper<Omit<MyUser, 'badges' | 'drafts' | 'posts' | 'publications'> & { badges: Array<ResolversTypes['Badge']>, drafts: ResolversTypes['UserDraftConnection'], posts: ResolversTypes['UserPostConnection'], publications: ResolversTypes['UserPublicationsConnection'] }>;
  NewsletterFeature: ResolverTypeWrapper<NewsletterFeature>;
  NewsletterFrequency: NewsletterFrequency;
  NewsletterRecord: ResolverTypeWrapper<Omit<NewsletterRecord, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  NewsletterSubscribeStatus: NewsletterSubscribeStatus;
  NewsletterSubscriber: ResolverTypeWrapper<NewsletterSubscriber>;
  NewsletterUnsubscribeStatus: NewsletterUnsubscribeStatus;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  OffsetPageInfo: ResolverTypeWrapper<OffsetPageInfo>;
  OpenGraphMetaData: ResolverTypeWrapper<OpenGraphMetaData>;
  PageConnection: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['PageConnection']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PagesPreferences: ResolverTypeWrapper<PagesPreferences>;
  PendingInvite: ResolverTypeWrapper<Omit<PendingInvite, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  PendingInviteConnection: ResolverTypeWrapper<PendingInviteConnection>;
  PopularTag: ResolverTypeWrapper<PopularTag>;
  PopularTagEdge: ResolverTypeWrapper<PopularTagEdge>;
  Post: ResolverTypeWrapper<Omit<Post, 'audioUrls' | 'author' | 'coAuthors' | 'contributors' | 'publication'> & { audioUrls?: Maybe<ResolversTypes['AudioUrls']>, author: ResolversTypes['User'], coAuthors?: Maybe<Array<ResolversTypes['User']>>, contributors: Array<ResolversTypes['User']>, publication?: Maybe<ResolversTypes['Publication']> }>;
  PostAuthorType: PostAuthorType;
  PostBadge: ResolverTypeWrapper<PostBadge>;
  PostBadgeType: PostBadgeType;
  PostBadgesFeature: ResolverTypeWrapper<PostBadgesFeature>;
  PostCommentConnection: ResolverTypeWrapper<PostCommentConnection>;
  PostCommentEdge: ResolverTypeWrapper<Omit<PostCommentEdge, 'node'> & { node: ResolversTypes['Comment'] }>;
  PostCommentSortBy: PostCommentSortBy;
  PostCommenterConnection: ResolverTypeWrapper<PostCommenterConnection>;
  PostCommenterEdge: ResolverTypeWrapper<Omit<PostCommenterEdge, 'node'> & { node: ResolversTypes['User'] }>;
  PostCommenterSortBy: PostCommenterSortBy;
  PostCoverImage: ResolverTypeWrapper<PostCoverImage>;
  PostEdge: ResolverTypeWrapper<Omit<PostEdge, 'node'> & { node: ResolversTypes['Post'] }>;
  PostFeatures: ResolverTypeWrapper<PostFeatures>;
  PostLikerConnection: ResolverTypeWrapper<PostLikerConnection>;
  PostLikerEdge: ResolverTypeWrapper<Omit<PostLikerEdge, 'node'> & { node: ResolversTypes['User'] }>;
  PostLikerFilter: PostLikerFilter;
  PostPreferences: ResolverTypeWrapper<PostPreferences>;
  Preferences: ResolverTypeWrapper<Preferences>;
  ProTeamFeature: ResolverTypeWrapper<ProTeamFeature>;
  Publication: ResolverTypeWrapper<Omit<Publication, 'allDrafts' | 'allScheduledDrafts' | 'author' | 'drafts' | 'pinnedPost' | 'post' | 'recommendedPublications' | 'recommendingPublications' | 'redirectedPost' | 'scheduledDrafts' | 'submittedDrafts'> & { allDrafts: ResolversTypes['DraftConnection'], allScheduledDrafts: ResolversTypes['DraftConnection'], author: ResolversTypes['User'], drafts: ResolversTypes['DraftConnection'], pinnedPost?: Maybe<ResolversTypes['Post']>, post?: Maybe<ResolversTypes['Post']>, recommendedPublications: Array<ResolversTypes['UserRecommendedPublicationEdge']>, recommendingPublications: ResolversTypes['PublicationUserRecommendingPublicationConnection'], redirectedPost?: Maybe<ResolversTypes['Post']>, scheduledDrafts: ResolversTypes['DraftConnection'], submittedDrafts: ResolversTypes['DraftConnection'] }>;
  PublicationDraftConnectionFilter: PublicationDraftConnectionFilter;
  PublicationFeatures: ResolverTypeWrapper<PublicationFeatures>;
  PublicationIntegrations: ResolverTypeWrapper<PublicationIntegrations>;
  PublicationInvite: ResolverTypeWrapper<PublicationInvite>;
  PublicationLayout: PublicationLayout;
  PublicationLinks: ResolverTypeWrapper<PublicationLinks>;
  PublicationMember: ResolverTypeWrapper<Omit<PublicationMember, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  PublicationMemberPrivacyState: PublicationMemberPrivacyState;
  PublicationNavbarItem: ResolverTypeWrapper<PublicationNavbarItem>;
  PublicationNavigationType: PublicationNavigationType;
  PublicationPostConnection: ResolverTypeWrapper<PublicationPostConnection>;
  PublicationPostConnectionFilter: PublicationPostConnectionFilter;
  PublicationPostPageConnection: ResolverTypeWrapper<Omit<PublicationPostPageConnection, 'nodes'> & { nodes: Array<ResolversTypes['Post']> }>;
  PublicationPostsViaPageFilter: PublicationPostsViaPageFilter;
  PublicationSponsorship: ResolverTypeWrapper<PublicationSponsorship>;
  PublicationUserRecommendingPublicationConnection: ResolverTypeWrapper<Omit<PublicationUserRecommendingPublicationConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['UserRecommendingPublicationEdge']>, nodes: Array<ResolversTypes['Publication']> }>;
  PublicationViewEdge: ResolverTypeWrapper<Omit<PublicationViewEdge, 'node'> & { node: ResolversTypes['Views'] }>;
  PublicationVisitorsEdge: ResolverTypeWrapper<Omit<PublicationVisitorsEdge, 'node'> & { node: ResolversTypes['Visitors'] }>;
  PublishDraftInput: PublishDraftInput;
  PublishDraftPayload: ResolverTypeWrapper<Omit<PublishDraftPayload, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  PublishPostInput: PublishPostInput;
  PublishPostPayload: ResolverTypeWrapper<Omit<PublishPostPayload, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  PublishPostSettingsInput: PublishPostSettingsInput;
  PublishPostTagInput: PublishPostTagInput;
  Query: ResolverTypeWrapper<{}>;
  RSSImport: ResolverTypeWrapper<RssImport>;
  ReadTimeFeature: ResolverTypeWrapper<ReadTimeFeature>;
  RecommendPublicationsInput: RecommendPublicationsInput;
  RecommendPublicationsPayload: ResolverTypeWrapper<Omit<RecommendPublicationsPayload, 'recommendedPublications'> & { recommendedPublications?: Maybe<Array<ResolversTypes['UserRecommendedPublicationEdge']>> }>;
  RecommendedPublicationEdge: ResolverTypeWrapper<Omit<RecommendedPublicationEdge, 'node'> & { node: ResolversTypes['Publication'] }>;
  RedirectionRule: ResolverTypeWrapper<RedirectionRule>;
  ReinviteUserToPublicationInput: ReinviteUserToPublicationInput;
  ReinviteUserToPublicationPayload: ResolverTypeWrapper<ReinviteUserToPublicationPayload>;
  RemoveCommentInput: RemoveCommentInput;
  RemoveCommentPayload: ResolverTypeWrapper<Omit<RemoveCommentPayload, 'comment'> & { comment?: Maybe<ResolversTypes['Comment']> }>;
  RemovePostInput: RemovePostInput;
  RemovePostPayload: ResolverTypeWrapper<Omit<RemovePostPayload, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  RemovePublicationMemberInput: RemovePublicationMemberInput;
  RemovePublicationMemberPayload: ResolverTypeWrapper<Omit<RemovePublicationMemberPayload, 'member'> & { member: ResolversTypes['PublicationMember'] }>;
  RemoveRecommendationInput: RemoveRecommendationInput;
  RemoveRecommendationPayload: ResolverTypeWrapper<Omit<RemoveRecommendationPayload, 'recommendedPublication'> & { recommendedPublication: ResolversTypes['Publication'] }>;
  RemoveRedirectionRuleInput: RemoveRedirectionRuleInput;
  RemoveRedirectionRulePayload: ResolverTypeWrapper<RemoveRedirectionRulePayload>;
  RemoveReplyInput: RemoveReplyInput;
  RemoveReplyPayload: ResolverTypeWrapper<Omit<RemoveReplyPayload, 'reply'> & { reply?: Maybe<ResolversTypes['Reply']> }>;
  RemoveSeriesInput: RemoveSeriesInput;
  RemoveSeriesPayload: ResolverTypeWrapper<RemoveSeriesPayload>;
  Reply: ResolverTypeWrapper<Omit<Reply, 'author'> & { author: ResolversTypes['User'] }>;
  RescheduleDraftInput: RescheduleDraftInput;
  RescheduleDraftPayload: ResolverTypeWrapper<Omit<RescheduleDraftPayload, 'scheduledPost'> & { scheduledPost: ResolversTypes['ScheduledPost'] }>;
  ResendWebhookRequestInput: ResendWebhookRequestInput;
  ResendWebhookRequestPayload: ResolverTypeWrapper<ResendWebhookRequestPayload>;
  RestorePostInput: RestorePostInput;
  RestorePostPayload: ResolverTypeWrapper<Omit<RestorePostPayload, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  RevokeUserInviteToPublicationInput: RevokeUserInviteToPublicationInput;
  RevokeUserInviteToPublicationPayload: ResolverTypeWrapper<RevokeUserInviteToPublicationPayload>;
  RoleBasedInvite: ResolverTypeWrapper<RoleBasedInvite>;
  RoleBasedInviteConnection: ResolverTypeWrapper<RoleBasedInviteConnection>;
  SEO: ResolverTypeWrapper<Seo>;
  ScheduleDraftInput: ScheduleDraftInput;
  ScheduleDraftPayload: ResolverTypeWrapper<Omit<ScheduleDraftPayload, 'scheduledPost'> & { scheduledPost: ResolversTypes['ScheduledPost'] }>;
  ScheduledPost: ResolverTypeWrapper<Omit<ScheduledPost, 'author' | 'draft' | 'publication' | 'scheduledBy'> & { author: ResolversTypes['User'], draft?: Maybe<ResolversTypes['Draft']>, publication: ResolversTypes['Publication'], scheduledBy?: Maybe<ResolversTypes['User']> }>;
  Scope: Scope;
  SearchPostConnection: ResolverTypeWrapper<SearchPostConnection>;
  SearchPostsOfPublicationFilter: SearchPostsOfPublicationFilter;
  SearchUser: ResolverTypeWrapper<Omit<SearchUser, 'user'> & { user: ResolversTypes['User'] }>;
  Series: ResolverTypeWrapper<Omit<Series, 'author'> & { author: ResolversTypes['User'] }>;
  SeriesConnection: ResolverTypeWrapper<SeriesConnection>;
  SeriesEdge: ResolverTypeWrapper<SeriesEdge>;
  SeriesPostConnection: ResolverTypeWrapper<SeriesPostConnection>;
  SocialMediaLinks: ResolverTypeWrapper<SocialMediaLinks>;
  SortOrder: SortOrder;
  StaticPage: ResolverTypeWrapper<StaticPage>;
  StaticPageConnection: ResolverTypeWrapper<StaticPageConnection>;
  StaticPageEdge: ResolverTypeWrapper<StaticPageEdge>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StripeConfiguration: ResolverTypeWrapper<StripeConfiguration>;
  SubscribeToNewsletterInput: SubscribeToNewsletterInput;
  SubscribeToNewsletterPayload: ResolverTypeWrapper<SubscribeToNewsletterPayload>;
  TableOfContentsFeature: ResolverTypeWrapper<TableOfContentsFeature>;
  TableOfContentsItem: ResolverTypeWrapper<TableOfContentsItem>;
  Tag: ResolverTypeWrapper<Tag>;
  TagEdge: ResolverTypeWrapper<TagEdge>;
  TagPostConnectionFilter: TagPostConnectionFilter;
  TagPostsSort: TagPostsSort;
  TextSelectionSharerFeature: ResolverTypeWrapper<TextSelectionSharerFeature>;
  ToggleAllowContributorEditsInput: ToggleAllowContributorEditsInput;
  ToggleAllowContributorEditsPayload: ResolverTypeWrapper<Omit<ToggleAllowContributorEditsPayload, 'publication'> & { publication?: Maybe<ResolversTypes['Publication']> }>;
  ToggleFollowUserPayload: ResolverTypeWrapper<Omit<ToggleFollowUserPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  ToggleGPTBotCrawlingInput: ToggleGptBotCrawlingInput;
  ToggleGPTBotCrawlingPayload: ResolverTypeWrapper<Omit<ToggleGptBotCrawlingPayload, 'publication'> & { publication?: Maybe<ResolversTypes['Publication']> }>;
  ToggleRoleBasedInviteLinksPayload: ResolverTypeWrapper<ToggleRoleBasedInviteLinksPayload>;
  ToggleTextSelectionSharerInput: ToggleTextSelectionSharerInput;
  ToggleTextSelectionSharerPayload: ResolverTypeWrapper<Omit<ToggleTextSelectionSharerPayload, 'publication'> & { publication?: Maybe<ResolversTypes['Publication']> }>;
  TriggerWebhookTestInput: TriggerWebhookTestInput;
  TriggerWebhookTestPayload: ResolverTypeWrapper<Omit<TriggerWebhookTestPayload, 'webhook'> & { webhook?: Maybe<ResolversTypes['Webhook']> }>;
  URL: ResolverTypeWrapper<Scalars['URL']['output']>;
  UngroupedViews: ResolverTypeWrapper<UngroupedViews>;
  UngroupedVisitors: ResolverTypeWrapper<UngroupedVisitors>;
  UnsubscribeFromNewsletterInput: UnsubscribeFromNewsletterInput;
  UnsubscribeFromNewsletterPayload: ResolverTypeWrapper<UnsubscribeFromNewsletterPayload>;
  UpdateCommentInput: UpdateCommentInput;
  UpdateCommentPayload: ResolverTypeWrapper<Omit<UpdateCommentPayload, 'comment'> & { comment?: Maybe<ResolversTypes['Comment']> }>;
  UpdatePostInput: UpdatePostInput;
  UpdatePostPayload: ResolverTypeWrapper<Omit<UpdatePostPayload, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  UpdatePostSettingsInput: UpdatePostSettingsInput;
  UpdateRedirectionRuleInput: UpdateRedirectionRuleInput;
  UpdateRedirectionRulePayload: ResolverTypeWrapper<UpdateRedirectionRulePayload>;
  UpdateReplyInput: UpdateReplyInput;
  UpdateReplyPayload: ResolverTypeWrapper<Omit<UpdateReplyPayload, 'reply'> & { reply?: Maybe<ResolversTypes['Reply']> }>;
  UpdateRoleBasedInviteInput: UpdateRoleBasedInviteInput;
  UpdateRoleBasedInvitePayload: ResolverTypeWrapper<UpdateRoleBasedInvitePayload>;
  UpdateSeriesInput: UpdateSeriesInput;
  UpdateSeriesPayload: ResolverTypeWrapper<UpdateSeriesPayload>;
  UpdateWebhookInput: UpdateWebhookInput;
  UpdateWebhookPayload: ResolverTypeWrapper<Omit<UpdateWebhookPayload, 'webhook'> & { webhook?: Maybe<ResolversTypes['Webhook']> }>;
  UrlPattern: UrlPattern;
  User: ResolverTypeWrapper<Omit<User, 'badges' | 'posts' | 'publications'> & { badges: Array<ResolversTypes['Badge']>, posts: ResolversTypes['UserPostConnection'], publications: ResolversTypes['UserPublicationsConnection'] }>;
  UserConnection: ResolverTypeWrapper<Omit<UserConnection, 'nodes'> & { nodes: Array<ResolversTypes['User']> }>;
  UserDraftConnection: ResolverTypeWrapper<Omit<UserDraftConnection, 'edges'> & { edges: Array<ResolversTypes['UserDraftEdge']> }>;
  UserDraftEdge: ResolverTypeWrapper<Omit<UserDraftEdge, 'node'> & { node: ResolversTypes['Draft'] }>;
  UserEdge: ResolverTypeWrapper<Omit<UserEdge, 'node'> & { node: ResolversTypes['User'] }>;
  UserInviteInput: UserInviteInput;
  UserPostConnection: ResolverTypeWrapper<Omit<UserPostConnection, 'edges' | 'nodes'> & { edges: Array<ResolversTypes['UserPostEdge']>, nodes: Array<ResolversTypes['Post']> }>;
  UserPostConnectionFilter: UserPostConnectionFilter;
  UserPostEdge: ResolverTypeWrapper<Omit<UserPostEdge, 'node'> & { node: ResolversTypes['Post'] }>;
  UserPostsAuthorTypeFilter: UserPostsAuthorTypeFilter;
  UserPostsSort: UserPostsSort;
  UserPublicationInviteRole: UserPublicationInviteRole;
  UserPublicationRole: UserPublicationRole;
  UserPublicationsConnection: ResolverTypeWrapper<Omit<UserPublicationsConnection, 'edges'> & { edges: Array<ResolversTypes['UserPublicationsEdge']> }>;
  UserPublicationsConnectionFilter: UserPublicationsConnectionFilter;
  UserPublicationsEdge: ResolverTypeWrapper<Omit<UserPublicationsEdge, 'node'> & { node: ResolversTypes['Publication'] }>;
  UserRecommendedPublicationEdge: ResolverTypeWrapper<Omit<UserRecommendedPublicationEdge, 'node'> & { node: ResolversTypes['Publication'] }>;
  UserRecommendingPublicationEdge: ResolverTypeWrapper<Omit<UserRecommendingPublicationEdge, 'node'> & { node: ResolversTypes['Publication'] }>;
  UserRole: UserRole;
  ValidationMethod: ValidationMethod;
  ViewCountFeature: ResolverTypeWrapper<ViewCountFeature>;
  Views: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Views']>;
  Visitors: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Visitors']>;
  Webhook: ResolverTypeWrapper<Omit<Webhook, 'publication'> & { publication: ResolversTypes['Publication'] }>;
  WebhookEvent: WebhookEvent;
  WebhookMessage: ResolverTypeWrapper<WebhookMessage>;
  WebhookMessageConnection: ResolverTypeWrapper<WebhookMessageConnection>;
  WebhookMessageEdge: ResolverTypeWrapper<WebhookMessageEdge>;
  WebhookMessageRequest: ResolverTypeWrapper<WebhookMessageRequest>;
  WebhookMessageRequestError: ResolverTypeWrapper<WebhookMessageRequestError>;
  WebhookMessageResponse: ResolverTypeWrapper<WebhookMessageResponse>;
  Widget: ResolverTypeWrapper<Widget>;
  WidgetPinLocation: WidgetPinLocation;
  WidgetPinSettings: ResolverTypeWrapper<WidgetPinSettings>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AcceptInviteToPublicationInput: AcceptInviteToPublicationInput;
  AcceptInviteToPublicationPayload: AcceptInviteToPublicationPayload;
  AcceptRoleBasedInviteInput: AcceptRoleBasedInviteInput;
  AcceptRoleBasedInvitePayload: AcceptRoleBasedInvitePayload;
  AddCommentInput: AddCommentInput;
  AddCommentPayload: Omit<AddCommentPayload, 'comment'> & { comment?: Maybe<ResolversParentTypes['Comment']> };
  AddPostToSeriesInput: AddPostToSeriesInput;
  AddPostToSeriesPayload: AddPostToSeriesPayload;
  AddReplyInput: AddReplyInput;
  AddReplyPayload: Omit<AddReplyPayload, 'reply'> & { reply?: Maybe<ResolversParentTypes['Reply']> };
  AudioBlogFeature: AudioBlogFeature;
  AudioUrls: AudioUrls;
  Badge: Badge;
  BetaFeature: BetaFeature;
  Boolean: Scalars['Boolean']['output'];
  CancelScheduledDraftInput: CancelScheduledDraftInput;
  CancelScheduledDraftPayload: Omit<CancelScheduledDraftPayload, 'scheduledPost'> & { scheduledPost: ResolversParentTypes['ScheduledPost'] };
  ChangePublicationMemberRoleInput: ChangePublicationMemberRoleInput;
  ChangePublicationMemberRolePayload: Omit<ChangePublicationMemberRolePayload, 'member'> & { member: ResolversParentTypes['PublicationMember'] };
  ChangePublicationMemberVisibilityInput: ChangePublicationMemberVisibilityInput;
  ChangePublicationMemberVisibilityPayload: Omit<ChangePublicationMemberVisibilityPayload, 'member'> & { member: ResolversParentTypes['PublicationMember'] };
  Comment: Omit<Comment, 'author' | 'replies'> & { author: ResolversParentTypes['User'], replies: ResolversParentTypes['CommentReplyConnection'] };
  CommentReplyConnection: Omit<CommentReplyConnection, 'edges'> & { edges: Array<ResolversParentTypes['CommentReplyEdge']> };
  CommentReplyEdge: Omit<CommentReplyEdge, 'node'> & { node: ResolversParentTypes['Reply'] };
  CommenterUserConnection: Omit<CommenterUserConnection, 'edges'> & { edges: Array<ResolversParentTypes['UserEdge']> };
  Connection: ResolversInterfaceTypes<ResolversParentTypes>['Connection'];
  Content: Content;
  CoverImageOptionsInput: CoverImageOptionsInput;
  CreateDraftInput: CreateDraftInput;
  CreateDraftPayload: Omit<CreateDraftPayload, 'draft'> & { draft?: Maybe<ResolversParentTypes['Draft']> };
  CreateDraftSettingsInput: CreateDraftSettingsInput;
  CreateDraftTagInput: CreateDraftTagInput;
  CreateRedirectionRuleInput: CreateRedirectionRuleInput;
  CreateRedirectionRulePayload: CreateRedirectionRulePayload;
  CreateRoleBasedInviteForPublicationInput: CreateRoleBasedInviteForPublicationInput;
  CreateRoleBasedInviteForPublicationPayload: CreateRoleBasedInviteForPublicationPayload;
  CreateSeriesInput: CreateSeriesInput;
  CreateSeriesPayload: CreateSeriesPayload;
  CreateWebhookInput: CreateWebhookInput;
  CreateWebhookPayload: Omit<CreateWebhookPayload, 'webhook'> & { webhook?: Maybe<ResolversParentTypes['Webhook']> };
  CustomCSS: CustomCss;
  CustomCSSFeature: CustomCssFeature;
  DarkModePreferences: DarkModePreferences;
  DateTime: Scalars['DateTime']['output'];
  DeleteRoleBasedInviteInput: DeleteRoleBasedInviteInput;
  DeleteRoleBasedInvitePayload: DeleteRoleBasedInvitePayload;
  DeleteWebhookPayload: Omit<DeleteWebhookPayload, 'webhook'> & { webhook?: Maybe<ResolversParentTypes['Webhook']> };
  DomainInfo: DomainInfo;
  DomainStatus: DomainStatus;
  Draft: Omit<Draft, 'author' | 'coAuthors' | 'coverImage' | 'publication' | 'publishAs' | 'tagsV2'> & { author: ResolversParentTypes['User'], coAuthors?: Maybe<Array<ResolversParentTypes['User']>>, coverImage?: Maybe<ResolversParentTypes['DraftCoverImage']>, publication?: Maybe<ResolversParentTypes['Publication']>, publishAs?: Maybe<ResolversParentTypes['User']>, tagsV2: Array<ResolversParentTypes['DraftTag']> };
  DraftBackup: DraftBackup;
  DraftBaseTag: DraftBaseTag;
  DraftConnection: Omit<DraftConnection, 'edges'> & { edges: Array<ResolversParentTypes['DraftEdge']> };
  DraftCoverImage: DraftCoverImage;
  DraftEdge: Omit<DraftEdge, 'node'> & { node: ResolversParentTypes['Draft'] };
  DraftFeatures: DraftFeatures;
  DraftRevision: DraftRevision;
  DraftRevisionEdge: DraftRevisionEdge;
  DraftSettings: DraftSettings;
  DraftTag: ResolversUnionTypes<ResolversParentTypes>['DraftTag'];
  Edge: ResolversInterfaceTypes<ResolversParentTypes>['Edge'];
  EmailCurrentImport: EmailCurrentImport;
  EmailImport: EmailImport;
  FailedInvite: FailedInvite;
  Feature: ResolversInterfaceTypes<ResolversParentTypes>['Feature'];
  FeedFilter: FeedFilter;
  FeedPostConnection: FeedPostConnection;
  Float: Scalars['Float']['output'];
  GPTBotCrawlingFeature: GptBotCrawlingFeature;
  GroupedByBrowserViews: GroupedByBrowserViews;
  GroupedByBrowserVisitors: GroupedByBrowserVisitors;
  GroupedByCountryViews: GroupedByCountryViews;
  GroupedByCountryVisitors: GroupedByCountryVisitors;
  GroupedByDeviceTypeViews: GroupedByDeviceTypeViews;
  GroupedByDeviceTypeVisitors: GroupedByDeviceTypeVisitors;
  GroupedByOperatingSystemViews: GroupedByOperatingSystemViews;
  GroupedByOperatingSystemVisitors: GroupedByOperatingSystemVisitors;
  GroupedByPageViews: GroupedByPageViews;
  GroupedByPageVisitors: GroupedByPageVisitors;
  GroupedByPathViews: GroupedByPathViews;
  GroupedByPathVisitors: GroupedByPathVisitors;
  GroupedByPostViews: Omit<GroupedByPostViews, 'post'> & { post: ResolversParentTypes['Post'] };
  GroupedByPostVisitors: Omit<GroupedByPostVisitors, 'post'> & { post: ResolversParentTypes['Post'] };
  GroupedByReferrerHostViews: GroupedByReferrerHostViews;
  GroupedByReferrerHostVisitors: GroupedByReferrerHostVisitors;
  GroupedByTimeViews: GroupedByTimeViews;
  GroupedByTimeVisitors: GroupedByTimeVisitors;
  HeadlessCMSFeature: HeadlessCmsFeature;
  ID: Scalars['ID']['output'];
  ITag: ResolversInterfaceTypes<ResolversParentTypes>['ITag'];
  IUser: ResolversInterfaceTypes<ResolversParentTypes>['IUser'];
  Int: Scalars['Int']['output'];
  InviteUsersToPublicationInput: InviteUsersToPublicationInput;
  InviteUsersToPublicationPayload: InviteUsersToPublicationPayload;
  LikeCommentInput: LikeCommentInput;
  LikeCommentPayload: Omit<LikeCommentPayload, 'comment'> & { comment?: Maybe<ResolversParentTypes['Comment']> };
  LikePostInput: LikePostInput;
  LikePostPayload: Omit<LikePostPayload, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  LikeReplyInput: LikeReplyInput;
  LikeReplyPayload: Omit<LikeReplyPayload, 'reply'> & { reply?: Maybe<ResolversParentTypes['Reply']> };
  MetaTagsInput: MetaTagsInput;
  Mutation: {};
  MyUser: Omit<MyUser, 'badges' | 'drafts' | 'posts' | 'publications'> & { badges: Array<ResolversParentTypes['Badge']>, drafts: ResolversParentTypes['UserDraftConnection'], posts: ResolversParentTypes['UserPostConnection'], publications: ResolversParentTypes['UserPublicationsConnection'] };
  NewsletterFeature: NewsletterFeature;
  NewsletterRecord: Omit<NewsletterRecord, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  NewsletterSubscriber: NewsletterSubscriber;
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  ObjectId: Scalars['ObjectId']['output'];
  OffsetPageInfo: OffsetPageInfo;
  OpenGraphMetaData: OpenGraphMetaData;
  PageConnection: ResolversInterfaceTypes<ResolversParentTypes>['PageConnection'];
  PageInfo: PageInfo;
  PagesPreferences: PagesPreferences;
  PendingInvite: Omit<PendingInvite, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  PendingInviteConnection: PendingInviteConnection;
  PopularTag: PopularTag;
  PopularTagEdge: PopularTagEdge;
  Post: Omit<Post, 'audioUrls' | 'author' | 'coAuthors' | 'contributors' | 'publication'> & { audioUrls?: Maybe<ResolversParentTypes['AudioUrls']>, author: ResolversParentTypes['User'], coAuthors?: Maybe<Array<ResolversParentTypes['User']>>, contributors: Array<ResolversParentTypes['User']>, publication?: Maybe<ResolversParentTypes['Publication']> };
  PostBadge: PostBadge;
  PostBadgesFeature: PostBadgesFeature;
  PostCommentConnection: PostCommentConnection;
  PostCommentEdge: Omit<PostCommentEdge, 'node'> & { node: ResolversParentTypes['Comment'] };
  PostCommenterConnection: PostCommenterConnection;
  PostCommenterEdge: Omit<PostCommenterEdge, 'node'> & { node: ResolversParentTypes['User'] };
  PostCoverImage: PostCoverImage;
  PostEdge: Omit<PostEdge, 'node'> & { node: ResolversParentTypes['Post'] };
  PostFeatures: PostFeatures;
  PostLikerConnection: PostLikerConnection;
  PostLikerEdge: Omit<PostLikerEdge, 'node'> & { node: ResolversParentTypes['User'] };
  PostLikerFilter: PostLikerFilter;
  PostPreferences: PostPreferences;
  Preferences: Preferences;
  ProTeamFeature: ProTeamFeature;
  Publication: Omit<Publication, 'allDrafts' | 'allScheduledDrafts' | 'author' | 'drafts' | 'pinnedPost' | 'post' | 'recommendedPublications' | 'recommendingPublications' | 'redirectedPost' | 'scheduledDrafts' | 'submittedDrafts'> & { allDrafts: ResolversParentTypes['DraftConnection'], allScheduledDrafts: ResolversParentTypes['DraftConnection'], author: ResolversParentTypes['User'], drafts: ResolversParentTypes['DraftConnection'], pinnedPost?: Maybe<ResolversParentTypes['Post']>, post?: Maybe<ResolversParentTypes['Post']>, recommendedPublications: Array<ResolversParentTypes['UserRecommendedPublicationEdge']>, recommendingPublications: ResolversParentTypes['PublicationUserRecommendingPublicationConnection'], redirectedPost?: Maybe<ResolversParentTypes['Post']>, scheduledDrafts: ResolversParentTypes['DraftConnection'], submittedDrafts: ResolversParentTypes['DraftConnection'] };
  PublicationDraftConnectionFilter: PublicationDraftConnectionFilter;
  PublicationFeatures: PublicationFeatures;
  PublicationIntegrations: PublicationIntegrations;
  PublicationInvite: PublicationInvite;
  PublicationLinks: PublicationLinks;
  PublicationMember: Omit<PublicationMember, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  PublicationNavbarItem: PublicationNavbarItem;
  PublicationPostConnection: PublicationPostConnection;
  PublicationPostConnectionFilter: PublicationPostConnectionFilter;
  PublicationPostPageConnection: Omit<PublicationPostPageConnection, 'nodes'> & { nodes: Array<ResolversParentTypes['Post']> };
  PublicationPostsViaPageFilter: PublicationPostsViaPageFilter;
  PublicationSponsorship: PublicationSponsorship;
  PublicationUserRecommendingPublicationConnection: Omit<PublicationUserRecommendingPublicationConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['UserRecommendingPublicationEdge']>, nodes: Array<ResolversParentTypes['Publication']> };
  PublicationViewEdge: Omit<PublicationViewEdge, 'node'> & { node: ResolversParentTypes['Views'] };
  PublicationVisitorsEdge: Omit<PublicationVisitorsEdge, 'node'> & { node: ResolversParentTypes['Visitors'] };
  PublishDraftInput: PublishDraftInput;
  PublishDraftPayload: Omit<PublishDraftPayload, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  PublishPostInput: PublishPostInput;
  PublishPostPayload: Omit<PublishPostPayload, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  PublishPostSettingsInput: PublishPostSettingsInput;
  PublishPostTagInput: PublishPostTagInput;
  Query: {};
  RSSImport: RssImport;
  ReadTimeFeature: ReadTimeFeature;
  RecommendPublicationsInput: RecommendPublicationsInput;
  RecommendPublicationsPayload: Omit<RecommendPublicationsPayload, 'recommendedPublications'> & { recommendedPublications?: Maybe<Array<ResolversParentTypes['UserRecommendedPublicationEdge']>> };
  RecommendedPublicationEdge: Omit<RecommendedPublicationEdge, 'node'> & { node: ResolversParentTypes['Publication'] };
  RedirectionRule: RedirectionRule;
  ReinviteUserToPublicationInput: ReinviteUserToPublicationInput;
  ReinviteUserToPublicationPayload: ReinviteUserToPublicationPayload;
  RemoveCommentInput: RemoveCommentInput;
  RemoveCommentPayload: Omit<RemoveCommentPayload, 'comment'> & { comment?: Maybe<ResolversParentTypes['Comment']> };
  RemovePostInput: RemovePostInput;
  RemovePostPayload: Omit<RemovePostPayload, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  RemovePublicationMemberInput: RemovePublicationMemberInput;
  RemovePublicationMemberPayload: Omit<RemovePublicationMemberPayload, 'member'> & { member: ResolversParentTypes['PublicationMember'] };
  RemoveRecommendationInput: RemoveRecommendationInput;
  RemoveRecommendationPayload: Omit<RemoveRecommendationPayload, 'recommendedPublication'> & { recommendedPublication: ResolversParentTypes['Publication'] };
  RemoveRedirectionRuleInput: RemoveRedirectionRuleInput;
  RemoveRedirectionRulePayload: RemoveRedirectionRulePayload;
  RemoveReplyInput: RemoveReplyInput;
  RemoveReplyPayload: Omit<RemoveReplyPayload, 'reply'> & { reply?: Maybe<ResolversParentTypes['Reply']> };
  RemoveSeriesInput: RemoveSeriesInput;
  RemoveSeriesPayload: RemoveSeriesPayload;
  Reply: Omit<Reply, 'author'> & { author: ResolversParentTypes['User'] };
  RescheduleDraftInput: RescheduleDraftInput;
  RescheduleDraftPayload: Omit<RescheduleDraftPayload, 'scheduledPost'> & { scheduledPost: ResolversParentTypes['ScheduledPost'] };
  ResendWebhookRequestInput: ResendWebhookRequestInput;
  ResendWebhookRequestPayload: ResendWebhookRequestPayload;
  RestorePostInput: RestorePostInput;
  RestorePostPayload: Omit<RestorePostPayload, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  RevokeUserInviteToPublicationInput: RevokeUserInviteToPublicationInput;
  RevokeUserInviteToPublicationPayload: RevokeUserInviteToPublicationPayload;
  RoleBasedInvite: RoleBasedInvite;
  RoleBasedInviteConnection: RoleBasedInviteConnection;
  SEO: Seo;
  ScheduleDraftInput: ScheduleDraftInput;
  ScheduleDraftPayload: Omit<ScheduleDraftPayload, 'scheduledPost'> & { scheduledPost: ResolversParentTypes['ScheduledPost'] };
  ScheduledPost: Omit<ScheduledPost, 'author' | 'draft' | 'publication' | 'scheduledBy'> & { author: ResolversParentTypes['User'], draft?: Maybe<ResolversParentTypes['Draft']>, publication: ResolversParentTypes['Publication'], scheduledBy?: Maybe<ResolversParentTypes['User']> };
  SearchPostConnection: SearchPostConnection;
  SearchPostsOfPublicationFilter: SearchPostsOfPublicationFilter;
  SearchUser: Omit<SearchUser, 'user'> & { user: ResolversParentTypes['User'] };
  Series: Omit<Series, 'author'> & { author: ResolversParentTypes['User'] };
  SeriesConnection: SeriesConnection;
  SeriesEdge: SeriesEdge;
  SeriesPostConnection: SeriesPostConnection;
  SocialMediaLinks: SocialMediaLinks;
  StaticPage: StaticPage;
  StaticPageConnection: StaticPageConnection;
  StaticPageEdge: StaticPageEdge;
  String: Scalars['String']['output'];
  StripeConfiguration: StripeConfiguration;
  SubscribeToNewsletterInput: SubscribeToNewsletterInput;
  SubscribeToNewsletterPayload: SubscribeToNewsletterPayload;
  TableOfContentsFeature: TableOfContentsFeature;
  TableOfContentsItem: TableOfContentsItem;
  Tag: Tag;
  TagEdge: TagEdge;
  TagPostConnectionFilter: TagPostConnectionFilter;
  TextSelectionSharerFeature: TextSelectionSharerFeature;
  ToggleAllowContributorEditsInput: ToggleAllowContributorEditsInput;
  ToggleAllowContributorEditsPayload: Omit<ToggleAllowContributorEditsPayload, 'publication'> & { publication?: Maybe<ResolversParentTypes['Publication']> };
  ToggleFollowUserPayload: Omit<ToggleFollowUserPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  ToggleGPTBotCrawlingInput: ToggleGptBotCrawlingInput;
  ToggleGPTBotCrawlingPayload: Omit<ToggleGptBotCrawlingPayload, 'publication'> & { publication?: Maybe<ResolversParentTypes['Publication']> };
  ToggleRoleBasedInviteLinksPayload: ToggleRoleBasedInviteLinksPayload;
  ToggleTextSelectionSharerInput: ToggleTextSelectionSharerInput;
  ToggleTextSelectionSharerPayload: Omit<ToggleTextSelectionSharerPayload, 'publication'> & { publication?: Maybe<ResolversParentTypes['Publication']> };
  TriggerWebhookTestInput: TriggerWebhookTestInput;
  TriggerWebhookTestPayload: Omit<TriggerWebhookTestPayload, 'webhook'> & { webhook?: Maybe<ResolversParentTypes['Webhook']> };
  URL: Scalars['URL']['output'];
  UngroupedViews: UngroupedViews;
  UngroupedVisitors: UngroupedVisitors;
  UnsubscribeFromNewsletterInput: UnsubscribeFromNewsletterInput;
  UnsubscribeFromNewsletterPayload: UnsubscribeFromNewsletterPayload;
  UpdateCommentInput: UpdateCommentInput;
  UpdateCommentPayload: Omit<UpdateCommentPayload, 'comment'> & { comment?: Maybe<ResolversParentTypes['Comment']> };
  UpdatePostInput: UpdatePostInput;
  UpdatePostPayload: Omit<UpdatePostPayload, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  UpdatePostSettingsInput: UpdatePostSettingsInput;
  UpdateRedirectionRuleInput: UpdateRedirectionRuleInput;
  UpdateRedirectionRulePayload: UpdateRedirectionRulePayload;
  UpdateReplyInput: UpdateReplyInput;
  UpdateReplyPayload: Omit<UpdateReplyPayload, 'reply'> & { reply?: Maybe<ResolversParentTypes['Reply']> };
  UpdateRoleBasedInviteInput: UpdateRoleBasedInviteInput;
  UpdateRoleBasedInvitePayload: UpdateRoleBasedInvitePayload;
  UpdateSeriesInput: UpdateSeriesInput;
  UpdateSeriesPayload: UpdateSeriesPayload;
  UpdateWebhookInput: UpdateWebhookInput;
  UpdateWebhookPayload: Omit<UpdateWebhookPayload, 'webhook'> & { webhook?: Maybe<ResolversParentTypes['Webhook']> };
  User: Omit<User, 'badges' | 'posts' | 'publications'> & { badges: Array<ResolversParentTypes['Badge']>, posts: ResolversParentTypes['UserPostConnection'], publications: ResolversParentTypes['UserPublicationsConnection'] };
  UserConnection: Omit<UserConnection, 'nodes'> & { nodes: Array<ResolversParentTypes['User']> };
  UserDraftConnection: Omit<UserDraftConnection, 'edges'> & { edges: Array<ResolversParentTypes['UserDraftEdge']> };
  UserDraftEdge: Omit<UserDraftEdge, 'node'> & { node: ResolversParentTypes['Draft'] };
  UserEdge: Omit<UserEdge, 'node'> & { node: ResolversParentTypes['User'] };
  UserInviteInput: UserInviteInput;
  UserPostConnection: Omit<UserPostConnection, 'edges' | 'nodes'> & { edges: Array<ResolversParentTypes['UserPostEdge']>, nodes: Array<ResolversParentTypes['Post']> };
  UserPostConnectionFilter: UserPostConnectionFilter;
  UserPostEdge: Omit<UserPostEdge, 'node'> & { node: ResolversParentTypes['Post'] };
  UserPublicationsConnection: Omit<UserPublicationsConnection, 'edges'> & { edges: Array<ResolversParentTypes['UserPublicationsEdge']> };
  UserPublicationsConnectionFilter: UserPublicationsConnectionFilter;
  UserPublicationsEdge: Omit<UserPublicationsEdge, 'node'> & { node: ResolversParentTypes['Publication'] };
  UserRecommendedPublicationEdge: Omit<UserRecommendedPublicationEdge, 'node'> & { node: ResolversParentTypes['Publication'] };
  UserRecommendingPublicationEdge: Omit<UserRecommendingPublicationEdge, 'node'> & { node: ResolversParentTypes['Publication'] };
  ViewCountFeature: ViewCountFeature;
  Views: ResolversInterfaceTypes<ResolversParentTypes>['Views'];
  Visitors: ResolversInterfaceTypes<ResolversParentTypes>['Visitors'];
  Webhook: Omit<Webhook, 'publication'> & { publication: ResolversParentTypes['Publication'] };
  WebhookMessage: WebhookMessage;
  WebhookMessageConnection: WebhookMessageConnection;
  WebhookMessageEdge: WebhookMessageEdge;
  WebhookMessageRequest: WebhookMessageRequest;
  WebhookMessageRequestError: WebhookMessageRequestError;
  WebhookMessageResponse: WebhookMessageResponse;
  Widget: Widget;
  WidgetPinSettings: WidgetPinSettings;
};

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']['input']>;
  endsWith?: Maybe<Scalars['String']['input']>;
  exclusiveMax?: Maybe<Scalars['Float']['input']>;
  exclusiveMin?: Maybe<Scalars['Float']['input']>;
  format?: Maybe<Scalars['String']['input']>;
  max?: Maybe<Scalars['Float']['input']>;
  maxItems?: Maybe<Scalars['Int']['input']>;
  maxLength?: Maybe<Scalars['Int']['input']>;
  min?: Maybe<Scalars['Float']['input']>;
  minItems?: Maybe<Scalars['Int']['input']>;
  minLength?: Maybe<Scalars['Int']['input']>;
  multipleOf?: Maybe<Scalars['Float']['input']>;
  notContains?: Maybe<Scalars['String']['input']>;
  pattern?: Maybe<Scalars['String']['input']>;
  startsWith?: Maybe<Scalars['String']['input']>;
  uniqueTypeName?: Maybe<Scalars['String']['input']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = any, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HiddenDirectiveArgs = { };

export type HiddenDirectiveResolver<Result, Parent, ContextType = any, Args = HiddenDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type PrivateDirectiveArgs = { };

export type PrivateDirectiveResolver<Result, Parent, ContextType = any, Args = PrivateDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RequireAuthDirectiveArgs = {
  scopes?: Maybe<Array<Scope>>;
};

export type RequireAuthDirectiveResolver<Result, Parent, ContextType = any, Args = RequireAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ValidateDirectiveArgs = {
  message?: Maybe<Scalars['String']['input']>;
  method: ValidationMethod;
};

export type ValidateDirectiveResolver<Result, Parent, ContextType = any, Args = ValidateDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AcceptInviteToPublicationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcceptInviteToPublicationPayload'] = ResolversParentTypes['AcceptInviteToPublicationPayload']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AcceptRoleBasedInvitePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AcceptRoleBasedInvitePayload'] = ResolversParentTypes['AcceptRoleBasedInvitePayload']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddCommentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddCommentPayload'] = ResolversParentTypes['AddCommentPayload']> = {
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddPostToSeriesPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddPostToSeriesPayload'] = ResolversParentTypes['AddPostToSeriesPayload']> = {
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddReplyPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddReplyPayload'] = ResolversParentTypes['AddReplyPayload']> = {
  reply?: Resolver<Maybe<ResolversTypes['Reply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AudioBlogFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['AudioBlogFeature'] = ResolversParentTypes['AudioBlogFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  voiceType?: Resolver<ResolversTypes['AudioBlogVoiceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AudioUrlsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AudioUrls'] = ResolversParentTypes['AudioUrls']> = {
  female?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  male?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BadgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Badge'] = ResolversParentTypes['Badge']> = {
  dateAssigned?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  infoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suppressed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BetaFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['BetaFeature'] = ResolversParentTypes['BetaFeature']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CancelScheduledDraftPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CancelScheduledDraftPayload'] = ResolversParentTypes['CancelScheduledDraftPayload']> = {
  scheduledPost?: Resolver<ResolversTypes['ScheduledPost'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePublicationMemberRolePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangePublicationMemberRolePayload'] = ResolversParentTypes['ChangePublicationMemberRolePayload']> = {
  member?: Resolver<ResolversTypes['PublicationMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePublicationMemberVisibilityPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangePublicationMemberVisibilityPayload'] = ResolversParentTypes['ChangePublicationMemberVisibilityPayload']> = {
  member?: Resolver<ResolversTypes['PublicationMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['Content'], ParentType, ContextType>;
  dateAdded?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  myTotalReactions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replies?: Resolver<ResolversTypes['CommentReplyConnection'], ParentType, ContextType, RequireFields<CommentRepliesArgs, 'first'>>;
  stamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalReactions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentReplyConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentReplyConnection'] = ResolversParentTypes['CommentReplyConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CommentReplyEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentReplyEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentReplyEdge'] = ResolversParentTypes['CommentReplyEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Reply'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommenterUserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommenterUserConnection'] = ResolversParentTypes['CommenterUserConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = {
  __resolveType: TypeResolveFn<'CommentReplyConnection' | 'CommenterUserConnection' | 'DraftConnection' | 'FeedPostConnection' | 'PostCommentConnection' | 'PostCommenterConnection' | 'PostLikerConnection' | 'PublicationPostConnection' | 'SearchPostConnection' | 'SeriesConnection' | 'SeriesPostConnection' | 'StaticPageConnection' | 'UserDraftConnection' | 'UserPublicationsConnection' | 'WebhookMessageConnection', ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['Edge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type ContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Content'] = ResolversParentTypes['Content']> = {
  html?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  markdown?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateDraftPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateDraftPayload'] = ResolversParentTypes['CreateDraftPayload']> = {
  draft?: Resolver<Maybe<ResolversTypes['Draft']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateRedirectionRulePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateRedirectionRulePayload'] = ResolversParentTypes['CreateRedirectionRulePayload']> = {
  redirectionRule?: Resolver<ResolversTypes['RedirectionRule'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateRoleBasedInviteForPublicationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateRoleBasedInviteForPublicationPayload'] = ResolversParentTypes['CreateRoleBasedInviteForPublicationPayload']> = {
  invite?: Resolver<ResolversTypes['RoleBasedInvite'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateSeriesPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateSeriesPayload'] = ResolversParentTypes['CreateSeriesPayload']> = {
  series?: Resolver<ResolversTypes['Series'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateWebhookPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateWebhookPayload'] = ResolversParentTypes['CreateWebhookPayload']> = {
  webhook?: Resolver<Maybe<ResolversTypes['Webhook']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomCssResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomCSS'] = ResolversParentTypes['CustomCSS']> = {
  home?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  homeMinified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postMinified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  static?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  staticMinified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomCssFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomCSSFeature'] = ResolversParentTypes['CustomCSSFeature']> = {
  draft?: Resolver<Maybe<ResolversTypes['CustomCSS']>, ParentType, ContextType>;
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['CustomCSS']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DarkModePreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DarkModePreferences'] = ResolversParentTypes['DarkModePreferences']> = {
  enabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteRoleBasedInvitePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteRoleBasedInvitePayload'] = ResolversParentTypes['DeleteRoleBasedInvitePayload']> = {
  invite?: Resolver<ResolversTypes['RoleBasedInvite'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteWebhookPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteWebhookPayload'] = ResolversParentTypes['DeleteWebhookPayload']> = {
  webhook?: Resolver<Maybe<ResolversTypes['Webhook']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DomainInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['DomainInfo'] = ResolversParentTypes['DomainInfo']> = {
  domain?: Resolver<Maybe<ResolversTypes['DomainStatus']>, ParentType, ContextType>;
  hashnodeSubdomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wwwPrefixedDomain?: Resolver<Maybe<ResolversTypes['DomainStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DomainStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['DomainStatus'] = ResolversParentTypes['DomainStatus']> = {
  host?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ready?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['CustomDomainStatus'], ParentType, ContextType>;
  verifiedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftResolvers<ContextType = any, ParentType extends ResolversParentTypes['Draft'] = ResolversParentTypes['Draft']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  canonicalUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coAuthors?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['DraftCoverImage']>, ParentType, ContextType>;
  dateUpdated?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  features?: Resolver<ResolversTypes['DraftFeatures'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSubmittedForReview?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastBackup?: Resolver<Maybe<ResolversTypes['DraftBackup']>, ParentType, ContextType>;
  lastFailedBackupAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  lastSuccessfulBackupAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  ogMetaData?: Resolver<Maybe<ResolversTypes['OpenGraphMetaData']>, ParentType, ContextType>;
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType>;
  publishAs?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  readTimeInMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scheduledDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  seo?: Resolver<Maybe<ResolversTypes['SEO']>, ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['DraftSettings'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  tagsV2?: Resolver<Array<ResolversTypes['DraftTag']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftBackupResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftBackup'] = ResolversParentTypes['DraftBackup']> = {
  at?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['BackupStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftBaseTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftBaseTag'] = ResolversParentTypes['DraftBaseTag']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftConnection'] = ResolversParentTypes['DraftConnection']> = {
  edges?: Resolver<Array<ResolversTypes['DraftEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftCoverImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftCoverImage'] = ResolversParentTypes['DraftCoverImage']> = {
  attribution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAttributionHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  photographer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftEdge'] = ResolversParentTypes['DraftEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Draft'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftFeaturesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftFeatures'] = ResolversParentTypes['DraftFeatures']> = {
  tableOfContents?: Resolver<ResolversTypes['TableOfContentsFeature'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftRevisionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftRevision'] = ResolversParentTypes['DraftRevision']> = {
  authorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['Content'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftRevisionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftRevisionEdge'] = ResolversParentTypes['DraftRevisionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['DraftRevision'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftSettings'] = ResolversParentTypes['DraftSettings']> = {
  disableComments?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isDelisted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  stickCoverToBottom?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DraftTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['DraftTag'] = ResolversParentTypes['DraftTag']> = {
  __resolveType: TypeResolveFn<'DraftBaseTag' | 'Tag', ParentType, ContextType>;
};

export type EdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = {
  __resolveType: TypeResolveFn<'CommentReplyEdge' | 'DraftEdge' | 'DraftRevisionEdge' | 'PopularTagEdge' | 'PostCommentEdge' | 'PostCommenterEdge' | 'PostEdge' | 'PostLikerEdge' | 'PublicationViewEdge' | 'PublicationVisitorsEdge' | 'RecommendedPublicationEdge' | 'SeriesEdge' | 'StaticPageEdge' | 'TagEdge' | 'UserDraftEdge' | 'UserEdge' | 'UserPublicationsEdge' | 'WebhookMessageEdge', ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Node'], ParentType, ContextType>;
};

export type EmailCurrentImportResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmailCurrentImport'] = ResolversParentTypes['EmailCurrentImport']> = {
  attemptedToImport?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  filename?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  importStartedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EmailImportStatus'], ParentType, ContextType>;
  successfullyImported?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailImportResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmailImport'] = ResolversParentTypes['EmailImport']> = {
  currentImport?: Resolver<Maybe<ResolversTypes['EmailCurrentImport']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FailedInviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['FailedInvite'] = ResolversParentTypes['FailedInvite']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']> = {
  __resolveType: TypeResolveFn<'AudioBlogFeature' | 'CustomCSSFeature' | 'GPTBotCrawlingFeature' | 'HeadlessCMSFeature' | 'NewsletterFeature' | 'PostBadgesFeature' | 'ProTeamFeature' | 'ReadTimeFeature' | 'TableOfContentsFeature' | 'TextSelectionSharerFeature' | 'ViewCountFeature', ParentType, ContextType>;
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type FeedPostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FeedPostConnection'] = ResolversParentTypes['FeedPostConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GptBotCrawlingFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['GPTBotCrawlingFeature'] = ResolversParentTypes['GPTBotCrawlingFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByBrowserViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByBrowserViews'] = ResolversParentTypes['GroupedByBrowserViews']> = {
  browser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByBrowserVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByBrowserVisitors'] = ResolversParentTypes['GroupedByBrowserVisitors']> = {
  browser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByCountryViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByCountryViews'] = ResolversParentTypes['GroupedByCountryViews']> = {
  country?: Resolver<ResolversTypes['CountryCodeAlpha2'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByCountryVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByCountryVisitors'] = ResolversParentTypes['GroupedByCountryVisitors']> = {
  country?: Resolver<ResolversTypes['CountryCodeAlpha2'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByDeviceTypeViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByDeviceTypeViews'] = ResolversParentTypes['GroupedByDeviceTypeViews']> = {
  deviceType?: Resolver<ResolversTypes['DeviceType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByDeviceTypeVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByDeviceTypeVisitors'] = ResolversParentTypes['GroupedByDeviceTypeVisitors']> = {
  deviceType?: Resolver<ResolversTypes['DeviceType'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByOperatingSystemViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByOperatingSystemViews'] = ResolversParentTypes['GroupedByOperatingSystemViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  operatingSystem?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByOperatingSystemVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByOperatingSystemVisitors'] = ResolversParentTypes['GroupedByOperatingSystemVisitors']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  operatingSystem?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByPageViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByPageViews'] = ResolversParentTypes['GroupedByPageViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['StaticPage'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByPageVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByPageVisitors'] = ResolversParentTypes['GroupedByPageVisitors']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['StaticPage'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByPathViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByPathViews'] = ResolversParentTypes['GroupedByPathViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByPathVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByPathVisitors'] = ResolversParentTypes['GroupedByPathVisitors']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByPostViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByPostViews'] = ResolversParentTypes['GroupedByPostViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByPostVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByPostVisitors'] = ResolversParentTypes['GroupedByPostVisitors']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByReferrerHostViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByReferrerHostViews'] = ResolversParentTypes['GroupedByReferrerHostViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  referrerHost?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByReferrerHostVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByReferrerHostVisitors'] = ResolversParentTypes['GroupedByReferrerHostVisitors']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  referrerHost?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByTimeViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByTimeViews'] = ResolversParentTypes['GroupedByTimeViews']> = {
  from?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupedByTimeVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupedByTimeVisitors'] = ResolversParentTypes['GroupedByTimeVisitors']> = {
  from?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HeadlessCmsFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['HeadlessCMSFeature'] = ResolversParentTypes['HeadlessCMSFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ITagResolvers<ContextType = any, ParentType extends ResolversParentTypes['ITag'] = ResolversParentTypes['ITag']> = {
  __resolveType: TypeResolveFn<'PopularTag' | 'Tag', ParentType, ContextType>;
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type IUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IUser'] = ResolversParentTypes['IUser']> = {
  __resolveType: TypeResolveFn<'MyUser' | 'User', ParentType, ContextType>;
  ambassador?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availableFor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  badges?: Resolver<Array<ResolversTypes['Badge']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  dateJoined?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deactivated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<IUserFollowersArgs, 'page' | 'pageSize'>>;
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followingsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  follows?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<IUserFollowsArgs, 'page' | 'pageSize'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<ResolversTypes['UserPostConnection'], ParentType, ContextType, RequireFields<IUserPostsArgs, 'page' | 'pageSize' | 'sortBy'>>;
  profilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publications?: Resolver<ResolversTypes['UserPublicationsConnection'], ParentType, ContextType, RequireFields<IUserPublicationsArgs, 'first'>>;
  socialMediaLinks?: Resolver<Maybe<ResolversTypes['SocialMediaLinks']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagsFollowing?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type InviteUsersToPublicationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteUsersToPublicationPayload'] = ResolversParentTypes['InviteUsersToPublicationPayload']> = {
  failedInvites?: Resolver<Array<ResolversTypes['FailedInvite']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  successfulInviteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeCommentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeCommentPayload'] = ResolversParentTypes['LikeCommentPayload']> = {
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikePostPayload'] = ResolversParentTypes['LikePostPayload']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeReplyPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeReplyPayload'] = ResolversParentTypes['LikeReplyPayload']> = {
  reply?: Resolver<Maybe<ResolversTypes['Reply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptInviteToPublication?: Resolver<ResolversTypes['AcceptInviteToPublicationPayload'], ParentType, ContextType, RequireFields<MutationAcceptInviteToPublicationArgs, 'input'>>;
  acceptRoleBasedInvite?: Resolver<ResolversTypes['AcceptRoleBasedInvitePayload'], ParentType, ContextType, RequireFields<MutationAcceptRoleBasedInviteArgs, 'input'>>;
  addComment?: Resolver<ResolversTypes['AddCommentPayload'], ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'input'>>;
  addPostToSeries?: Resolver<ResolversTypes['AddPostToSeriesPayload'], ParentType, ContextType, RequireFields<MutationAddPostToSeriesArgs, 'input'>>;
  addReply?: Resolver<ResolversTypes['AddReplyPayload'], ParentType, ContextType, RequireFields<MutationAddReplyArgs, 'input'>>;
  cancelScheduledDraft?: Resolver<ResolversTypes['CancelScheduledDraftPayload'], ParentType, ContextType, RequireFields<MutationCancelScheduledDraftArgs, 'input'>>;
  changePublicationMemberRole?: Resolver<ResolversTypes['ChangePublicationMemberRolePayload'], ParentType, ContextType, RequireFields<MutationChangePublicationMemberRoleArgs, 'input'>>;
  changePublicationMemberVisibility?: Resolver<ResolversTypes['ChangePublicationMemberVisibilityPayload'], ParentType, ContextType, RequireFields<MutationChangePublicationMemberVisibilityArgs, 'input'>>;
  createDraft?: Resolver<ResolversTypes['CreateDraftPayload'], ParentType, ContextType, RequireFields<MutationCreateDraftArgs, 'input'>>;
  createRedirectionRule?: Resolver<ResolversTypes['CreateRedirectionRulePayload'], ParentType, ContextType, RequireFields<MutationCreateRedirectionRuleArgs, 'input'>>;
  createRoleBasedInviteForPublication?: Resolver<ResolversTypes['CreateRoleBasedInviteForPublicationPayload'], ParentType, ContextType, RequireFields<MutationCreateRoleBasedInviteForPublicationArgs, 'input'>>;
  createSeries?: Resolver<ResolversTypes['CreateSeriesPayload'], ParentType, ContextType, RequireFields<MutationCreateSeriesArgs, 'input'>>;
  createWebhook?: Resolver<ResolversTypes['CreateWebhookPayload'], ParentType, ContextType, RequireFields<MutationCreateWebhookArgs, 'input'>>;
  deleteRoleBasedInvite?: Resolver<ResolversTypes['DeleteRoleBasedInvitePayload'], ParentType, ContextType, RequireFields<MutationDeleteRoleBasedInviteArgs, 'input'>>;
  deleteWebhook?: Resolver<ResolversTypes['DeleteWebhookPayload'], ParentType, ContextType, RequireFields<MutationDeleteWebhookArgs, 'id'>>;
  inviteUsersToPublication?: Resolver<ResolversTypes['InviteUsersToPublicationPayload'], ParentType, ContextType, RequireFields<MutationInviteUsersToPublicationArgs, 'input'>>;
  likeComment?: Resolver<ResolversTypes['LikeCommentPayload'], ParentType, ContextType, RequireFields<MutationLikeCommentArgs, 'input'>>;
  likePost?: Resolver<ResolversTypes['LikePostPayload'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'input'>>;
  likeReply?: Resolver<ResolversTypes['LikeReplyPayload'], ParentType, ContextType, RequireFields<MutationLikeReplyArgs, 'input'>>;
  publishDraft?: Resolver<ResolversTypes['PublishDraftPayload'], ParentType, ContextType, RequireFields<MutationPublishDraftArgs, 'input'>>;
  publishPost?: Resolver<ResolversTypes['PublishPostPayload'], ParentType, ContextType, RequireFields<MutationPublishPostArgs, 'input'>>;
  recommendPublications?: Resolver<ResolversTypes['RecommendPublicationsPayload'], ParentType, ContextType, RequireFields<MutationRecommendPublicationsArgs, 'input'>>;
  reinviteUserToPublication?: Resolver<ResolversTypes['ReinviteUserToPublicationPayload'], ParentType, ContextType, RequireFields<MutationReinviteUserToPublicationArgs, 'input'>>;
  removeComment?: Resolver<ResolversTypes['RemoveCommentPayload'], ParentType, ContextType, RequireFields<MutationRemoveCommentArgs, 'input'>>;
  removePost?: Resolver<ResolversTypes['RemovePostPayload'], ParentType, ContextType, RequireFields<MutationRemovePostArgs, 'input'>>;
  removePublicationMember?: Resolver<ResolversTypes['RemovePublicationMemberPayload'], ParentType, ContextType, RequireFields<MutationRemovePublicationMemberArgs, 'input'>>;
  removeRecommendation?: Resolver<ResolversTypes['RemoveRecommendationPayload'], ParentType, ContextType, RequireFields<MutationRemoveRecommendationArgs, 'input'>>;
  removeRedirectionRule?: Resolver<ResolversTypes['RemoveRedirectionRulePayload'], ParentType, ContextType, RequireFields<MutationRemoveRedirectionRuleArgs, 'input'>>;
  removeReply?: Resolver<ResolversTypes['RemoveReplyPayload'], ParentType, ContextType, RequireFields<MutationRemoveReplyArgs, 'input'>>;
  removeSeries?: Resolver<ResolversTypes['RemoveSeriesPayload'], ParentType, ContextType, RequireFields<MutationRemoveSeriesArgs, 'input'>>;
  rescheduleDraft?: Resolver<ResolversTypes['RescheduleDraftPayload'], ParentType, ContextType, RequireFields<MutationRescheduleDraftArgs, 'input'>>;
  resendWebhookRequest?: Resolver<ResolversTypes['ResendWebhookRequestPayload'], ParentType, ContextType, RequireFields<MutationResendWebhookRequestArgs, 'input'>>;
  restorePost?: Resolver<ResolversTypes['RestorePostPayload'], ParentType, ContextType, RequireFields<MutationRestorePostArgs, 'input'>>;
  revokeUserInviteToPublication?: Resolver<ResolversTypes['RevokeUserInviteToPublicationPayload'], ParentType, ContextType, RequireFields<MutationRevokeUserInviteToPublicationArgs, 'input'>>;
  scheduleDraft?: Resolver<ResolversTypes['ScheduleDraftPayload'], ParentType, ContextType, RequireFields<MutationScheduleDraftArgs, 'input'>>;
  subscribeToNewsletter?: Resolver<ResolversTypes['SubscribeToNewsletterPayload'], ParentType, ContextType, RequireFields<MutationSubscribeToNewsletterArgs, 'input'>>;
  toggleAllowContributorEdits?: Resolver<ResolversTypes['ToggleAllowContributorEditsPayload'], ParentType, ContextType, RequireFields<MutationToggleAllowContributorEditsArgs, 'input'>>;
  toggleFollowUser?: Resolver<ResolversTypes['ToggleFollowUserPayload'], ParentType, ContextType, Partial<MutationToggleFollowUserArgs>>;
  toggleGPTBotCrawling?: Resolver<ResolversTypes['ToggleGPTBotCrawlingPayload'], ParentType, ContextType, RequireFields<MutationToggleGptBotCrawlingArgs, 'input'>>;
  toggleRoleBasedInviteLinks?: Resolver<ResolversTypes['ToggleRoleBasedInviteLinksPayload'], ParentType, ContextType, RequireFields<MutationToggleRoleBasedInviteLinksArgs, 'publicationId'>>;
  toggleTextSelectionSharer?: Resolver<ResolversTypes['ToggleTextSelectionSharerPayload'], ParentType, ContextType, RequireFields<MutationToggleTextSelectionSharerArgs, 'input'>>;
  triggerWebhookTest?: Resolver<ResolversTypes['TriggerWebhookTestPayload'], ParentType, ContextType, RequireFields<MutationTriggerWebhookTestArgs, 'input'>>;
  unsubscribeFromNewsletter?: Resolver<ResolversTypes['UnsubscribeFromNewsletterPayload'], ParentType, ContextType, RequireFields<MutationUnsubscribeFromNewsletterArgs, 'input'>>;
  updateComment?: Resolver<ResolversTypes['UpdateCommentPayload'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'input'>>;
  updatePost?: Resolver<ResolversTypes['UpdatePostPayload'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input'>>;
  updateRedirectionRule?: Resolver<ResolversTypes['UpdateRedirectionRulePayload'], ParentType, ContextType, RequireFields<MutationUpdateRedirectionRuleArgs, 'input'>>;
  updateReply?: Resolver<ResolversTypes['UpdateReplyPayload'], ParentType, ContextType, RequireFields<MutationUpdateReplyArgs, 'input'>>;
  updateRoleBasedInvite?: Resolver<ResolversTypes['UpdateRoleBasedInvitePayload'], ParentType, ContextType, RequireFields<MutationUpdateRoleBasedInviteArgs, 'input'>>;
  updateSeries?: Resolver<ResolversTypes['UpdateSeriesPayload'], ParentType, ContextType, RequireFields<MutationUpdateSeriesArgs, 'input'>>;
  updateWebhook?: Resolver<ResolversTypes['UpdateWebhookPayload'], ParentType, ContextType, RequireFields<MutationUpdateWebhookArgs, 'input'>>;
};

export type MyUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['MyUser'] = ResolversParentTypes['MyUser']> = {
  ambassador?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availableFor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  badges?: Resolver<Array<ResolversTypes['Badge']>, ParentType, ContextType>;
  betaFeatures?: Resolver<Array<ResolversTypes['BetaFeature']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  dateJoined?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deactivated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  drafts?: Resolver<ResolversTypes['UserDraftConnection'], ParentType, ContextType, RequireFields<MyUserDraftsArgs, 'first'>>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<MyUserFollowersArgs, 'page' | 'pageSize'>>;
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followingsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  follows?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<MyUserFollowsArgs, 'page' | 'pageSize'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<ResolversTypes['UserPostConnection'], ParentType, ContextType, RequireFields<MyUserPostsArgs, 'page' | 'pageSize' | 'sortBy'>>;
  profilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publications?: Resolver<ResolversTypes['UserPublicationsConnection'], ParentType, ContextType, RequireFields<MyUserPublicationsArgs, 'first'>>;
  role?: Resolver<ResolversTypes['UserRole'], ParentType, ContextType>;
  socialMediaLinks?: Resolver<Maybe<ResolversTypes['SocialMediaLinks']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagsFollowing?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsletterFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsletterFeature'] = ResolversParentTypes['NewsletterFeature']> = {
  frequency?: Resolver<Maybe<ResolversTypes['NewsletterFrequency']>, ParentType, ContextType>;
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsletterRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsletterRecord'] = ResolversParentTypes['NewsletterRecord']> = {
  clickCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  openCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  sentAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  sentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsletterSubscriberResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewsletterSubscriber'] = ResolversParentTypes['NewsletterSubscriber']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['NewsletterSubscribeStatus'], ParentType, ContextType>;
  subscribedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Badge' | 'BetaFeature' | 'Comment' | 'Draft' | 'DraftRevision' | 'GroupedByBrowserViews' | 'GroupedByBrowserVisitors' | 'GroupedByCountryViews' | 'GroupedByCountryVisitors' | 'GroupedByDeviceTypeViews' | 'GroupedByDeviceTypeVisitors' | 'GroupedByOperatingSystemViews' | 'GroupedByOperatingSystemVisitors' | 'GroupedByPageViews' | 'GroupedByPageVisitors' | 'GroupedByPathViews' | 'GroupedByPathVisitors' | 'GroupedByPostViews' | 'GroupedByPostVisitors' | 'GroupedByReferrerHostViews' | 'GroupedByReferrerHostVisitors' | 'GroupedByTimeViews' | 'GroupedByTimeVisitors' | 'MyUser' | 'NewsletterRecord' | 'NewsletterSubscriber' | 'PendingInvite' | 'PopularTag' | 'Post' | 'PostBadge' | 'Publication' | 'PublicationMember' | 'RSSImport' | 'RedirectionRule' | 'Reply' | 'RoleBasedInvite' | 'ScheduledPost' | 'SearchUser' | 'Series' | 'StaticPage' | 'TableOfContentsItem' | 'Tag' | 'UngroupedViews' | 'UngroupedVisitors' | 'User' | 'Webhook' | 'WebhookMessage' | 'Widget', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type OffsetPageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffsetPageInfo'] = ResolversParentTypes['OffsetPageInfo']> = {
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  nextPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  previousPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenGraphMetaDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenGraphMetaData'] = ResolversParentTypes['OpenGraphMetaData']> = {
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageConnection'] = ResolversParentTypes['PageConnection']> = {
  __resolveType: TypeResolveFn<'PendingInviteConnection' | 'PublicationPostPageConnection' | 'PublicationUserRecommendingPublicationConnection' | 'RoleBasedInviteConnection' | 'UserConnection' | 'UserPostConnection', ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Node']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['OffsetPageInfo'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PagesPreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PagesPreferences'] = ResolversParentTypes['PagesPreferences']> = {
  badges?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  newsletter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PendingInviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['PendingInvite'] = ResolversParentTypes['PendingInvite']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserPublicationRole'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PendingInviteConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PendingInviteConnection'] = ResolversParentTypes['PendingInviteConnection']> = {
  nodes?: Resolver<Array<ResolversTypes['PendingInvite']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['OffsetPageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PopularTagResolvers<ContextType = any, ParentType extends ResolversParentTypes['PopularTag'] = ResolversParentTypes['PopularTag']> = {
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  postsCountInPeriod?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PopularTagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PopularTagEdge'] = ResolversParentTypes['PopularTagEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['PopularTag'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  audioUrls?: Resolver<Maybe<ResolversTypes['AudioUrls']>, ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  bookmarked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  brief?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  canonicalUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coAuthors?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  commenters?: Resolver<ResolversTypes['PostCommenterConnection'], ParentType, ContextType, RequireFields<PostCommentersArgs, 'first'>>;
  comments?: Resolver<ResolversTypes['PostCommentConnection'], ParentType, ContextType, RequireFields<PostCommentsArgs, 'first'>>;
  content?: Resolver<ResolversTypes['Content'], ParentType, ContextType>;
  contributors?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['PostCoverImage']>, ParentType, ContextType>;
  cuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  featuredAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  features?: Resolver<ResolversTypes['PostFeatures'], ParentType, ContextType>;
  hasLatexInPost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAutoPublishedFromRSS?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFollowed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likedBy?: Resolver<ResolversTypes['PostLikerConnection'], ParentType, ContextType, RequireFields<PostLikedByArgs, 'first'>>;
  ogMetaData?: Resolver<Maybe<ResolversTypes['OpenGraphMetaData']>, ParentType, ContextType>;
  preferences?: Resolver<ResolversTypes['PostPreferences'], ParentType, ContextType>;
  previousSlugs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  reactionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  readTimeInMinutes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replyCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  responseCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seo?: Resolver<Maybe<ResolversTypes['SEO']>, ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sourcedFromGithub?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostBadgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostBadge'] = ResolversParentTypes['PostBadge']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PostBadgeType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostBadgesFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostBadgesFeature'] = ResolversParentTypes['PostBadgesFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['PostBadge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostCommentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostCommentConnection'] = ResolversParentTypes['PostCommentConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostCommentEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostCommentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostCommentEdge'] = ResolversParentTypes['PostCommentEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostCommenterConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostCommenterConnection'] = ResolversParentTypes['PostCommenterConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostCommenterEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostCommenterEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostCommenterEdge'] = ResolversParentTypes['PostCommenterEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostCoverImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostCoverImage'] = ResolversParentTypes['PostCoverImage']> = {
  attribution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isAttributionHidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPortrait?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  photographer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostEdge'] = ResolversParentTypes['PostEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostFeaturesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostFeatures'] = ResolversParentTypes['PostFeatures']> = {
  badges?: Resolver<ResolversTypes['PostBadgesFeature'], ParentType, ContextType>;
  tableOfContents?: Resolver<ResolversTypes['TableOfContentsFeature'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostLikerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostLikerConnection'] = ResolversParentTypes['PostLikerConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostLikerEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostLikerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostLikerEdge'] = ResolversParentTypes['PostLikerEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  reactionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostPreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostPreferences'] = ResolversParentTypes['PostPreferences']> = {
  disableComments?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isDelisted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pinnedToBlog?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  stickCoverToBottom?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preferences'] = ResolversParentTypes['Preferences']> = {
  darkMode?: Resolver<Maybe<ResolversTypes['DarkModePreferences']>, ParentType, ContextType>;
  disableFooterBranding?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  enabledPages?: Resolver<Maybe<ResolversTypes['PagesPreferences']>, ParentType, ContextType>;
  isSubscriptionModalDisabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  layout?: Resolver<Maybe<ResolversTypes['PublicationLayout']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  navbarItems?: Resolver<Array<ResolversTypes['PublicationNavbarItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProTeamFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProTeamFeature'] = ResolversParentTypes['ProTeamFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Publication'] = ResolversParentTypes['Publication']> = {
  about?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  allDrafts?: Resolver<ResolversTypes['DraftConnection'], ParentType, ContextType, RequireFields<PublicationAllDraftsArgs, 'first'>>;
  allScheduledDrafts?: Resolver<ResolversTypes['DraftConnection'], ParentType, ContextType, RequireFields<PublicationAllScheduledDraftsArgs, 'first'>>;
  allowContributorEdits?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  canonicalURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  descriptionSEO?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  domainInfo?: Resolver<ResolversTypes['DomainInfo'], ParentType, ContextType>;
  drafts?: Resolver<ResolversTypes['DraftConnection'], ParentType, ContextType, RequireFields<PublicationDraftsArgs, 'first'>>;
  emailImport?: Resolver<Maybe<ResolversTypes['EmailImport']>, ParentType, ContextType>;
  favicon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  features?: Resolver<ResolversTypes['PublicationFeatures'], ParentType, ContextType>;
  followersCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hasBadges?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  headerColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imprint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imprintV2?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  integrations?: Resolver<Maybe<ResolversTypes['PublicationIntegrations']>, ParentType, ContextType>;
  invites?: Resolver<Maybe<ResolversTypes['PublicationInvite']>, ParentType, ContextType>;
  isGitHubBackupEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isGithubAsSourceConnected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isHeadless?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isTeam?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  links?: Resolver<Maybe<ResolversTypes['PublicationLinks']>, ParentType, ContextType>;
  metaTags?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ogMetaData?: Resolver<ResolversTypes['OpenGraphMetaData'], ParentType, ContextType>;
  pinnedPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<PublicationPostArgs, 'slug'>>;
  posts?: Resolver<ResolversTypes['PublicationPostConnection'], ParentType, ContextType, RequireFields<PublicationPostsArgs, 'first'>>;
  postsViaPage?: Resolver<ResolversTypes['PublicationPostPageConnection'], ParentType, ContextType, RequireFields<PublicationPostsViaPageArgs, 'page' | 'pageSize'>>;
  preferences?: Resolver<ResolversTypes['Preferences'], ParentType, ContextType>;
  recommendedPublications?: Resolver<Array<ResolversTypes['UserRecommendedPublicationEdge']>, ParentType, ContextType>;
  recommendingPublications?: Resolver<ResolversTypes['PublicationUserRecommendingPublicationConnection'], ParentType, ContextType, RequireFields<PublicationRecommendingPublicationsArgs, 'page' | 'pageSize'>>;
  redirectedPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<PublicationRedirectedPostArgs, 'slug'>>;
  redirectionRules?: Resolver<Array<ResolversTypes['RedirectionRule']>, ParentType, ContextType>;
  scheduledDrafts?: Resolver<ResolversTypes['DraftConnection'], ParentType, ContextType, RequireFields<PublicationScheduledDraftsArgs, 'first'>>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType, RequireFields<PublicationSeriesArgs, 'slug'>>;
  seriesList?: Resolver<ResolversTypes['SeriesConnection'], ParentType, ContextType, RequireFields<PublicationSeriesListArgs, 'first'>>;
  sponsorship?: Resolver<Maybe<ResolversTypes['PublicationSponsorship']>, ParentType, ContextType>;
  staticPage?: Resolver<Maybe<ResolversTypes['StaticPage']>, ParentType, ContextType, RequireFields<PublicationStaticPageArgs, 'slug'>>;
  staticPages?: Resolver<ResolversTypes['StaticPageConnection'], ParentType, ContextType, RequireFields<PublicationStaticPagesArgs, 'first'>>;
  submittedDrafts?: Resolver<ResolversTypes['DraftConnection'], ParentType, ContextType, RequireFields<PublicationSubmittedDraftsArgs, 'first'>>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalRecommendedPublications?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  urlPattern?: Resolver<ResolversTypes['UrlPattern'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationFeaturesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationFeatures'] = ResolversParentTypes['PublicationFeatures']> = {
  audioBlog?: Resolver<ResolversTypes['AudioBlogFeature'], ParentType, ContextType>;
  customCSS?: Resolver<ResolversTypes['CustomCSSFeature'], ParentType, ContextType>;
  gptBotCrawling?: Resolver<ResolversTypes['GPTBotCrawlingFeature'], ParentType, ContextType>;
  headlessCMS?: Resolver<ResolversTypes['HeadlessCMSFeature'], ParentType, ContextType>;
  newsletter?: Resolver<ResolversTypes['NewsletterFeature'], ParentType, ContextType>;
  proTeam?: Resolver<ResolversTypes['ProTeamFeature'], ParentType, ContextType>;
  readTime?: Resolver<ResolversTypes['ReadTimeFeature'], ParentType, ContextType>;
  textSelectionSharer?: Resolver<ResolversTypes['TextSelectionSharerFeature'], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['ViewCountFeature'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationIntegrationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationIntegrations'] = ResolversParentTypes['PublicationIntegrations']> = {
  fathomCustomDomain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fathomCustomDomainEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  fathomSiteID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fbPixelID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gTagManagerID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gaTrackingID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hotjarSiteID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  matomoSiteID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  matomoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  plausibleAnalyticsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  umamiShareId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  umamiWebsiteUUID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wmPaymentPointer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationInviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationInvite'] = ResolversParentTypes['PublicationInvite']> = {
  areRoleBasedInviteLinksActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  pendingInvites?: Resolver<ResolversTypes['PendingInviteConnection'], ParentType, ContextType, RequireFields<PublicationInvitePendingInvitesArgs, 'page' | 'pageSize'>>;
  roleBasedInvites?: Resolver<ResolversTypes['RoleBasedInviteConnection'], ParentType, ContextType, RequireFields<PublicationInviteRoleBasedInvitesArgs, 'page' | 'pageSize'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationLinksResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationLinks'] = ResolversParentTypes['PublicationLinks']> = {
  dailydev?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hashnode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mastodon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationMember'] = ResolversParentTypes['PublicationMember']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  privacyState?: Resolver<Maybe<ResolversTypes['PublicationMemberPrivacyState']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserPublicationRole'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationNavbarItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationNavbarItem'] = ResolversParentTypes['PublicationNavbarItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['StaticPage']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  series?: Resolver<Maybe<ResolversTypes['Series']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PublicationNavigationType'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationPostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationPostConnection'] = ResolversParentTypes['PublicationPostConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationPostPageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationPostPageConnection'] = ResolversParentTypes['PublicationPostPageConnection']> = {
  nodes?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['OffsetPageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationSponsorshipResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationSponsorship'] = ResolversParentTypes['PublicationSponsorship']> = {
  content?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  stripe?: Resolver<Maybe<ResolversTypes['StripeConfiguration']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationUserRecommendingPublicationConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationUserRecommendingPublicationConnection'] = ResolversParentTypes['PublicationUserRecommendingPublicationConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserRecommendingPublicationEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Publication']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['OffsetPageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationViewEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationViewEdge'] = ResolversParentTypes['PublicationViewEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Views'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublicationVisitorsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicationVisitorsEdge'] = ResolversParentTypes['PublicationVisitorsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Visitors'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublishDraftPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublishDraftPayload'] = ResolversParentTypes['PublishDraftPayload']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublishPostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublishPostPayload'] = ResolversParentTypes['PublishPostPayload']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  draft?: Resolver<Maybe<ResolversTypes['Draft']>, ParentType, ContextType, RequireFields<QueryDraftArgs, 'id'>>;
  feed?: Resolver<ResolversTypes['FeedPostConnection'], ParentType, ContextType, RequireFields<QueryFeedArgs, 'first'>>;
  me?: Resolver<ResolversTypes['MyUser'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType, Partial<QueryPublicationArgs>>;
  scheduledPost?: Resolver<Maybe<ResolversTypes['ScheduledPost']>, ParentType, ContextType, Partial<QueryScheduledPostArgs>>;
  searchPostsOfPublication?: Resolver<ResolversTypes['SearchPostConnection'], ParentType, ContextType, RequireFields<QuerySearchPostsOfPublicationArgs, 'filter' | 'first'>>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagArgs, 'slug'>>;
  topCommenters?: Resolver<ResolversTypes['CommenterUserConnection'], ParentType, ContextType, RequireFields<QueryTopCommentersArgs, 'first'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'username'>>;
};

export type RssImportResolvers<ContextType = any, ParentType extends ResolversParentTypes['RSSImport'] = ResolversParentTypes['RSSImport']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  importAsDrafts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rssTagName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rssURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scrapePosts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReadTimeFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReadTimeFeature'] = ResolversParentTypes['ReadTimeFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendPublicationsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecommendPublicationsPayload'] = ResolversParentTypes['RecommendPublicationsPayload']> = {
  recommendedPublications?: Resolver<Maybe<Array<ResolversTypes['UserRecommendedPublicationEdge']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendedPublicationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecommendedPublicationEdge'] = ResolversParentTypes['RecommendedPublicationEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RedirectionRuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['RedirectionRule'] = ResolversParentTypes['RedirectionRule']> = {
  destination?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['HttpRedirectionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReinviteUserToPublicationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReinviteUserToPublicationPayload'] = ResolversParentTypes['ReinviteUserToPublicationPayload']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveCommentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveCommentPayload'] = ResolversParentTypes['RemoveCommentPayload']> = {
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemovePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemovePostPayload'] = ResolversParentTypes['RemovePostPayload']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemovePublicationMemberPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemovePublicationMemberPayload'] = ResolversParentTypes['RemovePublicationMemberPayload']> = {
  member?: Resolver<ResolversTypes['PublicationMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveRecommendationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveRecommendationPayload'] = ResolversParentTypes['RemoveRecommendationPayload']> = {
  recommendedPublication?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveRedirectionRulePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveRedirectionRulePayload'] = ResolversParentTypes['RemoveRedirectionRulePayload']> = {
  redirectionRule?: Resolver<ResolversTypes['RedirectionRule'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveReplyPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveReplyPayload'] = ResolversParentTypes['RemoveReplyPayload']> = {
  reply?: Resolver<Maybe<ResolversTypes['Reply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveSeriesPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveSeriesPayload'] = ResolversParentTypes['RemoveSeriesPayload']> = {
  series?: Resolver<ResolversTypes['Series'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReplyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reply'] = ResolversParentTypes['Reply']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['Content'], ParentType, ContextType>;
  dateAdded?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  myTotalReactions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalReactions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RescheduleDraftPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RescheduleDraftPayload'] = ResolversParentTypes['RescheduleDraftPayload']> = {
  scheduledPost?: Resolver<ResolversTypes['ScheduledPost'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResendWebhookRequestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResendWebhookRequestPayload'] = ResolversParentTypes['ResendWebhookRequestPayload']> = {
  webhookMessage?: Resolver<Maybe<ResolversTypes['WebhookMessage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestorePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RestorePostPayload'] = ResolversParentTypes['RestorePostPayload']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RevokeUserInviteToPublicationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RevokeUserInviteToPublicationPayload'] = ResolversParentTypes['RevokeUserInviteToPublicationPayload']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleBasedInviteResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoleBasedInvite'] = ResolversParentTypes['RoleBasedInvite']> = {
  capacity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inviteLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isUnlimitedCapacity?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserPublicationRole'], ParentType, ContextType>;
  usedCapacity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleBasedInviteConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoleBasedInviteConnection'] = ResolversParentTypes['RoleBasedInviteConnection']> = {
  nodes?: Resolver<Array<ResolversTypes['RoleBasedInvite']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['OffsetPageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SEO'] = ResolversParentTypes['SEO']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduleDraftPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduleDraftPayload'] = ResolversParentTypes['ScheduleDraftPayload']> = {
  scheduledPost?: Resolver<ResolversTypes['ScheduledPost'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduledPostResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduledPost'] = ResolversParentTypes['ScheduledPost']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  draft?: Resolver<Maybe<ResolversTypes['Draft']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  publication?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>;
  scheduledBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  scheduledDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchPostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchPostConnection'] = ResolversParentTypes['SearchPostConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchUser'] = ResolversParentTypes['SearchUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pendingInviteStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Series'] = ResolversParentTypes['Series']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  cuid?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<ResolversTypes['SeriesPostConnection'], ParentType, ContextType, RequireFields<SeriesPostsArgs, 'first'>>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['SortOrder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeriesConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeriesConnection'] = ResolversParentTypes['SeriesConnection']> = {
  edges?: Resolver<Array<ResolversTypes['SeriesEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeriesEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeriesEdge'] = ResolversParentTypes['SeriesEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Series'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeriesPostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeriesPostConnection'] = ResolversParentTypes['SeriesPostConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialMediaLinksResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialMediaLinks'] = ResolversParentTypes['SocialMediaLinks']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stackoverflow?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaticPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaticPage'] = ResolversParentTypes['StaticPage']> = {
  content?: Resolver<ResolversTypes['Content'], ParentType, ContextType>;
  hidden?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ogMetaData?: Resolver<Maybe<ResolversTypes['OpenGraphMetaData']>, ParentType, ContextType>;
  seo?: Resolver<Maybe<ResolversTypes['SEO']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaticPageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaticPageConnection'] = ResolversParentTypes['StaticPageConnection']> = {
  edges?: Resolver<Array<ResolversTypes['StaticPageEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StaticPageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['StaticPageEdge'] = ResolversParentTypes['StaticPageEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['StaticPage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StripeConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['StripeConfiguration'] = ResolversParentTypes['StripeConfiguration']> = {
  accountId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  connected?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscribeToNewsletterPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscribeToNewsletterPayload'] = ResolversParentTypes['SubscribeToNewsletterPayload']> = {
  status?: Resolver<Maybe<ResolversTypes['NewsletterSubscribeStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TableOfContentsFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['TableOfContentsFeature'] = ResolversParentTypes['TableOfContentsFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['TableOfContentsItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TableOfContentsItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['TableOfContentsItem'] = ResolversParentTypes['TableOfContentsItem']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  info?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<ResolversTypes['FeedPostConnection'], ParentType, ContextType, RequireFields<TagPostsArgs, 'filter' | 'first'>>;
  postsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TagEdge'] = ResolversParentTypes['TagEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Tag'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TextSelectionSharerFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['TextSelectionSharerFeature'] = ResolversParentTypes['TextSelectionSharerFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleAllowContributorEditsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleAllowContributorEditsPayload'] = ResolversParentTypes['ToggleAllowContributorEditsPayload']> = {
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleFollowUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleFollowUserPayload'] = ResolversParentTypes['ToggleFollowUserPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleGptBotCrawlingPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleGPTBotCrawlingPayload'] = ResolversParentTypes['ToggleGPTBotCrawlingPayload']> = {
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleRoleBasedInviteLinksPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleRoleBasedInviteLinksPayload'] = ResolversParentTypes['ToggleRoleBasedInviteLinksPayload']> = {
  areRoleBasedInviteLinksActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleTextSelectionSharerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ToggleTextSelectionSharerPayload'] = ResolversParentTypes['ToggleTextSelectionSharerPayload']> = {
  publication?: Resolver<Maybe<ResolversTypes['Publication']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TriggerWebhookTestPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['TriggerWebhookTestPayload'] = ResolversParentTypes['TriggerWebhookTestPayload']> = {
  webhook?: Resolver<Maybe<ResolversTypes['Webhook']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UngroupedViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UngroupedViews'] = ResolversParentTypes['UngroupedViews']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UngroupedVisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UngroupedVisitors'] = ResolversParentTypes['UngroupedVisitors']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnsubscribeFromNewsletterPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnsubscribeFromNewsletterPayload'] = ResolversParentTypes['UnsubscribeFromNewsletterPayload']> = {
  status?: Resolver<Maybe<ResolversTypes['NewsletterUnsubscribeStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateCommentPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateCommentPayload'] = ResolversParentTypes['UpdateCommentPayload']> = {
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePostPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatePostPayload'] = ResolversParentTypes['UpdatePostPayload']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateRedirectionRulePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateRedirectionRulePayload'] = ResolversParentTypes['UpdateRedirectionRulePayload']> = {
  redirectionRule?: Resolver<ResolversTypes['RedirectionRule'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateReplyPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateReplyPayload'] = ResolversParentTypes['UpdateReplyPayload']> = {
  reply?: Resolver<Maybe<ResolversTypes['Reply']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateRoleBasedInvitePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateRoleBasedInvitePayload'] = ResolversParentTypes['UpdateRoleBasedInvitePayload']> = {
  invite?: Resolver<ResolversTypes['RoleBasedInvite'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateSeriesPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateSeriesPayload'] = ResolversParentTypes['UpdateSeriesPayload']> = {
  series?: Resolver<ResolversTypes['Series'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateWebhookPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateWebhookPayload'] = ResolversParentTypes['UpdateWebhookPayload']> = {
  webhook?: Resolver<Maybe<ResolversTypes['Webhook']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  ambassador?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  availableFor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  badges?: Resolver<Array<ResolversTypes['Badge']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  bioV2?: Resolver<Maybe<ResolversTypes['Content']>, ParentType, ContextType>;
  dateJoined?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deactivated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followers?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<UserFollowersArgs, 'page' | 'pageSize'>>;
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  following?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  followingsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  follows?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<UserFollowsArgs, 'page' | 'pageSize'>>;
  followsBack?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPro?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<ResolversTypes['UserPostConnection'], ParentType, ContextType, RequireFields<UserPostsArgs, 'page' | 'pageSize' | 'sortBy'>>;
  profilePicture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publications?: Resolver<ResolversTypes['UserPublicationsConnection'], ParentType, ContextType, RequireFields<UserPublicationsArgs, 'first'>>;
  socialMediaLinks?: Resolver<Maybe<ResolversTypes['SocialMediaLinks']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagsFollowing?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  nodes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['OffsetPageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDraftConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDraftConnection'] = ResolversParentTypes['UserDraftConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserDraftEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDraftEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserDraftEdge'] = ResolversParentTypes['UserDraftEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Draft'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPostConnection'] = ResolversParentTypes['UserPostConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserPostEdge']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['OffsetPageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPostEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPostEdge'] = ResolversParentTypes['UserPostEdge']> = {
  authorType?: Resolver<ResolversTypes['PostAuthorType'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPublicationsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPublicationsConnection'] = ResolversParentTypes['UserPublicationsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserPublicationsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalDocuments?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPublicationsEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPublicationsEdge'] = ResolversParentTypes['UserPublicationsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['UserPublicationRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRecommendedPublicationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRecommendedPublicationEdge'] = ResolversParentTypes['UserRecommendedPublicationEdge']> = {
  node?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>;
  totalFollowersGained?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRecommendingPublicationEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserRecommendingPublicationEdge'] = ResolversParentTypes['UserRecommendingPublicationEdge']> = {
  node?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>;
  totalFollowersGained?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewCountFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['ViewCountFeature'] = ResolversParentTypes['ViewCountFeature']> = {
  isEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Views'] = ResolversParentTypes['Views']> = {
  __resolveType: TypeResolveFn<'GroupedByBrowserViews' | 'GroupedByCountryViews' | 'GroupedByDeviceTypeViews' | 'GroupedByOperatingSystemViews' | 'GroupedByPageViews' | 'GroupedByPathViews' | 'GroupedByPostViews' | 'GroupedByReferrerHostViews' | 'GroupedByTimeViews' | 'UngroupedViews', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type VisitorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Visitors'] = ResolversParentTypes['Visitors']> = {
  __resolveType: TypeResolveFn<'GroupedByBrowserVisitors' | 'GroupedByCountryVisitors' | 'GroupedByDeviceTypeVisitors' | 'GroupedByOperatingSystemVisitors' | 'GroupedByPageVisitors' | 'GroupedByPathVisitors' | 'GroupedByPostVisitors' | 'GroupedByReferrerHostVisitors' | 'GroupedByTimeVisitors' | 'UngroupedVisitors', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type WebhookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Webhook'] = ResolversParentTypes['Webhook']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  events?: Resolver<Array<ResolversTypes['WebhookEvent']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<ResolversTypes['WebhookMessageConnection'], ParentType, ContextType, RequireFields<WebhookMessagesArgs, 'first'>>;
  publication?: Resolver<ResolversTypes['Publication'], ParentType, ContextType>;
  secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMessage'] = ResolversParentTypes['WebhookMessage']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['WebhookEvent'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isError?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isResent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isTest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  request?: Resolver<ResolversTypes['WebhookMessageRequest'], ParentType, ContextType>;
  response?: Resolver<Maybe<ResolversTypes['WebhookMessageResponse']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookMessageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMessageConnection'] = ResolversParentTypes['WebhookMessageConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WebhookMessageEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookMessageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMessageEdge'] = ResolversParentTypes['WebhookMessageEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WebhookMessage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookMessageRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMessageRequest'] = ResolversParentTypes['WebhookMessageRequest']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['WebhookMessageRequestError']>, ParentType, ContextType>;
  headers?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookMessageRequestErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMessageRequestError'] = ResolversParentTypes['WebhookMessageRequestError']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookMessageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookMessageResponse'] = ResolversParentTypes['WebhookMessageResponse']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  headers?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  httpStatus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timeToFirstByteMilliseconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Widget'] = ResolversParentTypes['Widget']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pinSettings?: Resolver<Maybe<ResolversTypes['WidgetPinSettings']>, ParentType, ContextType>;
  widgetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WidgetPinSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WidgetPinSettings'] = ResolversParentTypes['WidgetPinSettings']> = {
  isPinned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['WidgetPinLocation'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AcceptInviteToPublicationPayload?: AcceptInviteToPublicationPayloadResolvers<ContextType>;
  AcceptRoleBasedInvitePayload?: AcceptRoleBasedInvitePayloadResolvers<ContextType>;
  AddCommentPayload?: AddCommentPayloadResolvers<ContextType>;
  AddPostToSeriesPayload?: AddPostToSeriesPayloadResolvers<ContextType>;
  AddReplyPayload?: AddReplyPayloadResolvers<ContextType>;
  AudioBlogFeature?: AudioBlogFeatureResolvers<ContextType>;
  AudioUrls?: AudioUrlsResolvers<ContextType>;
  Badge?: BadgeResolvers<ContextType>;
  BetaFeature?: BetaFeatureResolvers<ContextType>;
  CancelScheduledDraftPayload?: CancelScheduledDraftPayloadResolvers<ContextType>;
  ChangePublicationMemberRolePayload?: ChangePublicationMemberRolePayloadResolvers<ContextType>;
  ChangePublicationMemberVisibilityPayload?: ChangePublicationMemberVisibilityPayloadResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentReplyConnection?: CommentReplyConnectionResolvers<ContextType>;
  CommentReplyEdge?: CommentReplyEdgeResolvers<ContextType>;
  CommenterUserConnection?: CommenterUserConnectionResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  CreateDraftPayload?: CreateDraftPayloadResolvers<ContextType>;
  CreateRedirectionRulePayload?: CreateRedirectionRulePayloadResolvers<ContextType>;
  CreateRoleBasedInviteForPublicationPayload?: CreateRoleBasedInviteForPublicationPayloadResolvers<ContextType>;
  CreateSeriesPayload?: CreateSeriesPayloadResolvers<ContextType>;
  CreateWebhookPayload?: CreateWebhookPayloadResolvers<ContextType>;
  CustomCSS?: CustomCssResolvers<ContextType>;
  CustomCSSFeature?: CustomCssFeatureResolvers<ContextType>;
  DarkModePreferences?: DarkModePreferencesResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteRoleBasedInvitePayload?: DeleteRoleBasedInvitePayloadResolvers<ContextType>;
  DeleteWebhookPayload?: DeleteWebhookPayloadResolvers<ContextType>;
  DomainInfo?: DomainInfoResolvers<ContextType>;
  DomainStatus?: DomainStatusResolvers<ContextType>;
  Draft?: DraftResolvers<ContextType>;
  DraftBackup?: DraftBackupResolvers<ContextType>;
  DraftBaseTag?: DraftBaseTagResolvers<ContextType>;
  DraftConnection?: DraftConnectionResolvers<ContextType>;
  DraftCoverImage?: DraftCoverImageResolvers<ContextType>;
  DraftEdge?: DraftEdgeResolvers<ContextType>;
  DraftFeatures?: DraftFeaturesResolvers<ContextType>;
  DraftRevision?: DraftRevisionResolvers<ContextType>;
  DraftRevisionEdge?: DraftRevisionEdgeResolvers<ContextType>;
  DraftSettings?: DraftSettingsResolvers<ContextType>;
  DraftTag?: DraftTagResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  EmailCurrentImport?: EmailCurrentImportResolvers<ContextType>;
  EmailImport?: EmailImportResolvers<ContextType>;
  FailedInvite?: FailedInviteResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  FeedPostConnection?: FeedPostConnectionResolvers<ContextType>;
  GPTBotCrawlingFeature?: GptBotCrawlingFeatureResolvers<ContextType>;
  GroupedByBrowserViews?: GroupedByBrowserViewsResolvers<ContextType>;
  GroupedByBrowserVisitors?: GroupedByBrowserVisitorsResolvers<ContextType>;
  GroupedByCountryViews?: GroupedByCountryViewsResolvers<ContextType>;
  GroupedByCountryVisitors?: GroupedByCountryVisitorsResolvers<ContextType>;
  GroupedByDeviceTypeViews?: GroupedByDeviceTypeViewsResolvers<ContextType>;
  GroupedByDeviceTypeVisitors?: GroupedByDeviceTypeVisitorsResolvers<ContextType>;
  GroupedByOperatingSystemViews?: GroupedByOperatingSystemViewsResolvers<ContextType>;
  GroupedByOperatingSystemVisitors?: GroupedByOperatingSystemVisitorsResolvers<ContextType>;
  GroupedByPageViews?: GroupedByPageViewsResolvers<ContextType>;
  GroupedByPageVisitors?: GroupedByPageVisitorsResolvers<ContextType>;
  GroupedByPathViews?: GroupedByPathViewsResolvers<ContextType>;
  GroupedByPathVisitors?: GroupedByPathVisitorsResolvers<ContextType>;
  GroupedByPostViews?: GroupedByPostViewsResolvers<ContextType>;
  GroupedByPostVisitors?: GroupedByPostVisitorsResolvers<ContextType>;
  GroupedByReferrerHostViews?: GroupedByReferrerHostViewsResolvers<ContextType>;
  GroupedByReferrerHostVisitors?: GroupedByReferrerHostVisitorsResolvers<ContextType>;
  GroupedByTimeViews?: GroupedByTimeViewsResolvers<ContextType>;
  GroupedByTimeVisitors?: GroupedByTimeVisitorsResolvers<ContextType>;
  HeadlessCMSFeature?: HeadlessCmsFeatureResolvers<ContextType>;
  ITag?: ITagResolvers<ContextType>;
  IUser?: IUserResolvers<ContextType>;
  InviteUsersToPublicationPayload?: InviteUsersToPublicationPayloadResolvers<ContextType>;
  LikeCommentPayload?: LikeCommentPayloadResolvers<ContextType>;
  LikePostPayload?: LikePostPayloadResolvers<ContextType>;
  LikeReplyPayload?: LikeReplyPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MyUser?: MyUserResolvers<ContextType>;
  NewsletterFeature?: NewsletterFeatureResolvers<ContextType>;
  NewsletterRecord?: NewsletterRecordResolvers<ContextType>;
  NewsletterSubscriber?: NewsletterSubscriberResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  OffsetPageInfo?: OffsetPageInfoResolvers<ContextType>;
  OpenGraphMetaData?: OpenGraphMetaDataResolvers<ContextType>;
  PageConnection?: PageConnectionResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PagesPreferences?: PagesPreferencesResolvers<ContextType>;
  PendingInvite?: PendingInviteResolvers<ContextType>;
  PendingInviteConnection?: PendingInviteConnectionResolvers<ContextType>;
  PopularTag?: PopularTagResolvers<ContextType>;
  PopularTagEdge?: PopularTagEdgeResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostBadge?: PostBadgeResolvers<ContextType>;
  PostBadgesFeature?: PostBadgesFeatureResolvers<ContextType>;
  PostCommentConnection?: PostCommentConnectionResolvers<ContextType>;
  PostCommentEdge?: PostCommentEdgeResolvers<ContextType>;
  PostCommenterConnection?: PostCommenterConnectionResolvers<ContextType>;
  PostCommenterEdge?: PostCommenterEdgeResolvers<ContextType>;
  PostCoverImage?: PostCoverImageResolvers<ContextType>;
  PostEdge?: PostEdgeResolvers<ContextType>;
  PostFeatures?: PostFeaturesResolvers<ContextType>;
  PostLikerConnection?: PostLikerConnectionResolvers<ContextType>;
  PostLikerEdge?: PostLikerEdgeResolvers<ContextType>;
  PostPreferences?: PostPreferencesResolvers<ContextType>;
  Preferences?: PreferencesResolvers<ContextType>;
  ProTeamFeature?: ProTeamFeatureResolvers<ContextType>;
  Publication?: PublicationResolvers<ContextType>;
  PublicationFeatures?: PublicationFeaturesResolvers<ContextType>;
  PublicationIntegrations?: PublicationIntegrationsResolvers<ContextType>;
  PublicationInvite?: PublicationInviteResolvers<ContextType>;
  PublicationLinks?: PublicationLinksResolvers<ContextType>;
  PublicationMember?: PublicationMemberResolvers<ContextType>;
  PublicationNavbarItem?: PublicationNavbarItemResolvers<ContextType>;
  PublicationPostConnection?: PublicationPostConnectionResolvers<ContextType>;
  PublicationPostPageConnection?: PublicationPostPageConnectionResolvers<ContextType>;
  PublicationSponsorship?: PublicationSponsorshipResolvers<ContextType>;
  PublicationUserRecommendingPublicationConnection?: PublicationUserRecommendingPublicationConnectionResolvers<ContextType>;
  PublicationViewEdge?: PublicationViewEdgeResolvers<ContextType>;
  PublicationVisitorsEdge?: PublicationVisitorsEdgeResolvers<ContextType>;
  PublishDraftPayload?: PublishDraftPayloadResolvers<ContextType>;
  PublishPostPayload?: PublishPostPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RSSImport?: RssImportResolvers<ContextType>;
  ReadTimeFeature?: ReadTimeFeatureResolvers<ContextType>;
  RecommendPublicationsPayload?: RecommendPublicationsPayloadResolvers<ContextType>;
  RecommendedPublicationEdge?: RecommendedPublicationEdgeResolvers<ContextType>;
  RedirectionRule?: RedirectionRuleResolvers<ContextType>;
  ReinviteUserToPublicationPayload?: ReinviteUserToPublicationPayloadResolvers<ContextType>;
  RemoveCommentPayload?: RemoveCommentPayloadResolvers<ContextType>;
  RemovePostPayload?: RemovePostPayloadResolvers<ContextType>;
  RemovePublicationMemberPayload?: RemovePublicationMemberPayloadResolvers<ContextType>;
  RemoveRecommendationPayload?: RemoveRecommendationPayloadResolvers<ContextType>;
  RemoveRedirectionRulePayload?: RemoveRedirectionRulePayloadResolvers<ContextType>;
  RemoveReplyPayload?: RemoveReplyPayloadResolvers<ContextType>;
  RemoveSeriesPayload?: RemoveSeriesPayloadResolvers<ContextType>;
  Reply?: ReplyResolvers<ContextType>;
  RescheduleDraftPayload?: RescheduleDraftPayloadResolvers<ContextType>;
  ResendWebhookRequestPayload?: ResendWebhookRequestPayloadResolvers<ContextType>;
  RestorePostPayload?: RestorePostPayloadResolvers<ContextType>;
  RevokeUserInviteToPublicationPayload?: RevokeUserInviteToPublicationPayloadResolvers<ContextType>;
  RoleBasedInvite?: RoleBasedInviteResolvers<ContextType>;
  RoleBasedInviteConnection?: RoleBasedInviteConnectionResolvers<ContextType>;
  SEO?: SeoResolvers<ContextType>;
  ScheduleDraftPayload?: ScheduleDraftPayloadResolvers<ContextType>;
  ScheduledPost?: ScheduledPostResolvers<ContextType>;
  SearchPostConnection?: SearchPostConnectionResolvers<ContextType>;
  SearchUser?: SearchUserResolvers<ContextType>;
  Series?: SeriesResolvers<ContextType>;
  SeriesConnection?: SeriesConnectionResolvers<ContextType>;
  SeriesEdge?: SeriesEdgeResolvers<ContextType>;
  SeriesPostConnection?: SeriesPostConnectionResolvers<ContextType>;
  SocialMediaLinks?: SocialMediaLinksResolvers<ContextType>;
  StaticPage?: StaticPageResolvers<ContextType>;
  StaticPageConnection?: StaticPageConnectionResolvers<ContextType>;
  StaticPageEdge?: StaticPageEdgeResolvers<ContextType>;
  StripeConfiguration?: StripeConfigurationResolvers<ContextType>;
  SubscribeToNewsletterPayload?: SubscribeToNewsletterPayloadResolvers<ContextType>;
  TableOfContentsFeature?: TableOfContentsFeatureResolvers<ContextType>;
  TableOfContentsItem?: TableOfContentsItemResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagEdge?: TagEdgeResolvers<ContextType>;
  TextSelectionSharerFeature?: TextSelectionSharerFeatureResolvers<ContextType>;
  ToggleAllowContributorEditsPayload?: ToggleAllowContributorEditsPayloadResolvers<ContextType>;
  ToggleFollowUserPayload?: ToggleFollowUserPayloadResolvers<ContextType>;
  ToggleGPTBotCrawlingPayload?: ToggleGptBotCrawlingPayloadResolvers<ContextType>;
  ToggleRoleBasedInviteLinksPayload?: ToggleRoleBasedInviteLinksPayloadResolvers<ContextType>;
  ToggleTextSelectionSharerPayload?: ToggleTextSelectionSharerPayloadResolvers<ContextType>;
  TriggerWebhookTestPayload?: TriggerWebhookTestPayloadResolvers<ContextType>;
  URL?: GraphQLScalarType;
  UngroupedViews?: UngroupedViewsResolvers<ContextType>;
  UngroupedVisitors?: UngroupedVisitorsResolvers<ContextType>;
  UnsubscribeFromNewsletterPayload?: UnsubscribeFromNewsletterPayloadResolvers<ContextType>;
  UpdateCommentPayload?: UpdateCommentPayloadResolvers<ContextType>;
  UpdatePostPayload?: UpdatePostPayloadResolvers<ContextType>;
  UpdateRedirectionRulePayload?: UpdateRedirectionRulePayloadResolvers<ContextType>;
  UpdateReplyPayload?: UpdateReplyPayloadResolvers<ContextType>;
  UpdateRoleBasedInvitePayload?: UpdateRoleBasedInvitePayloadResolvers<ContextType>;
  UpdateSeriesPayload?: UpdateSeriesPayloadResolvers<ContextType>;
  UpdateWebhookPayload?: UpdateWebhookPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserDraftConnection?: UserDraftConnectionResolvers<ContextType>;
  UserDraftEdge?: UserDraftEdgeResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UserPostConnection?: UserPostConnectionResolvers<ContextType>;
  UserPostEdge?: UserPostEdgeResolvers<ContextType>;
  UserPublicationsConnection?: UserPublicationsConnectionResolvers<ContextType>;
  UserPublicationsEdge?: UserPublicationsEdgeResolvers<ContextType>;
  UserRecommendedPublicationEdge?: UserRecommendedPublicationEdgeResolvers<ContextType>;
  UserRecommendingPublicationEdge?: UserRecommendingPublicationEdgeResolvers<ContextType>;
  ViewCountFeature?: ViewCountFeatureResolvers<ContextType>;
  Views?: ViewsResolvers<ContextType>;
  Visitors?: VisitorsResolvers<ContextType>;
  Webhook?: WebhookResolvers<ContextType>;
  WebhookMessage?: WebhookMessageResolvers<ContextType>;
  WebhookMessageConnection?: WebhookMessageConnectionResolvers<ContextType>;
  WebhookMessageEdge?: WebhookMessageEdgeResolvers<ContextType>;
  WebhookMessageRequest?: WebhookMessageRequestResolvers<ContextType>;
  WebhookMessageRequestError?: WebhookMessageRequestErrorResolvers<ContextType>;
  WebhookMessageResponse?: WebhookMessageResponseResolvers<ContextType>;
  Widget?: WidgetResolvers<ContextType>;
  WidgetPinSettings?: WidgetPinSettingsResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
  hidden?: HiddenDirectiveResolver<any, any, ContextType>;
  private?: PrivateDirectiveResolver<any, any, ContextType>;
  requireAuth?: RequireAuthDirectiveResolver<any, any, ContextType>;
  validate?: ValidateDirectiveResolver<any, any, ContextType>;
};
