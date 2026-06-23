import type { ComponentType, ReactNode, SVGProps } from "react";

export type BrandIconProps = {
  className?: string;
  strokeWidth?: number;
  title?: string;
};

type IconBaseProps = BrandIconProps & {
  children: ReactNode;
};

const accent = "#4FB3BF";

function BrandIconBase({
  children,
  className = "h-12 w-12",
  strokeWidth = 1.8,
  title,
  ...rest
}: IconBaseProps & Omit<SVGProps<SVGSVGElement>, keyof BrandIconProps>) {
  const titleId = title
    ? `brand-icon-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
    : undefined;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={titleId}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      {children}
    </svg>
  );
}

const ToothRow = ({ y = 24 }: { y?: number }) => (
  <>
    <path d={`M17 ${y + 2}c1.2-5 6.8-5 8 0 1.2-5 6.8-5 8 0 1.2-5 6.8-5 8 0 1.2-5 6.8-5 8 0`} />
    <path d={`M17 ${y + 2}c1 5 5.2 5 6.5 0M25 ${y + 2}c1 5 5.2 5 6.5 0M33 ${y + 2}c1 5 5.2 5 6.5 0M41 ${y + 2}c1 5 5.2 5 6.5 0`} />
  </>
);

export function CrowdingIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <ToothRow y={20} />
      <path d="M15 38c7-4 12-2 17 0s11 3 18-1" />
      <path d="M26 40c1.2-6 7.8-6 9 0" />
      <path d="M34 37c1.2-5 7-5 8 1" />
      <path stroke={accent} d="M18 31h28" />
    </BrandIconBase>
  );
}

export function DeepBiteIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M16 17c0-4 32-4 32 0v13c-6 2-26 2-32 0Z" />
      <path d="M18 25c2-5 6-5 8 0 2-5 6-5 8 0 2-5 6-5 8 0" />
      <path d="M18 37c5 3 23 3 28 0" />
      <path stroke={accent} d="M20 31h24" />
    </BrandIconBase>
  );
}

export function OpenBiteIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <ToothRow y={17} />
      <ToothRow y={39} />
      <path stroke={accent} d="M32 29v8M29 33h6" />
    </BrandIconBase>
  );
}

export function CrossbiteIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <ToothRow y={19} />
      <ToothRow y={38} />
      <path stroke={accent} d="M22 34h20M34 29l8 5-8 5" />
      <path stroke={accent} d="M42 27v14" strokeDasharray="2 4" />
    </BrandIconBase>
  );
}

export function ClassIIIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M40 10c7 6 9 16 4 25" />
      <path d="M25 43c8-2 15-1 22 3" />
      <path d="M18 33h23" />
      <path d="M15 43h21" />
      <path stroke={accent} d="M29 28h12" />
    </BrandIconBase>
  );
}

export function ClassIIIIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M38 10c7 6 9 16 4 25" />
      <path d="M19 47c9-5 20-4 29-1" />
      <path d="M21 32h21" />
      <path d="M25 43h25" />
      <path stroke={accent} d="M25 50h14" />
    </BrandIconBase>
  );
}

export function ImpactedCanineIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <ToothRow y={22} />
      <path d="M20 39c7 5 18 5 25 0" />
      <path stroke={accent} d="M42 30c6 7 2 14-6 17" strokeDasharray="2 4" />
      <path d="M39 43l5-7" />
    </BrandIconBase>
  );
}

export function DiastemaIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <rect x="18" y="18" width="12" height="28" rx="6" />
      <rect x="34" y="18" width="12" height="28" rx="6" />
      <path stroke={accent} d="M32 24v18" />
      <path stroke={accent} d="M29 35h6" />
    </BrandIconBase>
  );
}

export function BruxismIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M22 24c0-8 20-8 20 0 0 12-4 24-9 24-2 0-2-6-6-6s-4 6-6 6c-5 0-9-12-9-24Z" />
      <path stroke={accent} d="M21 12l-3-4M32 10V5M43 12l3-4" />
      <path d="M27 29l5 4-4 4" />
    </BrandIconBase>
  );
}

export function BiteIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M17 25c0-6 30-6 30 0v9c-6 2-24 2-30 0Z" />
      <path d="M18 37c5 6 23 6 28 0" />
      <path stroke={accent} d="M20 30c7 2 17 2 24 0" />
      <path stroke={accent} d="M16 42c8 5 24 5 32 0" opacity=".7" />
    </BrandIconBase>
  );
}

export function IntraoralScanIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M13 43l26-26c3-3 8-3 11 0l2 2-30 30Z" />
      <path d="M17 39l8 8" />
      <path stroke={accent} d="M43 17h9M47 21h7M41 25h8" />
    </BrandIconBase>
  );
}

export function VirtualPatientIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M32 8l18 10v20L32 56 14 38V18Z" />
      <path d="M14 18l18 10 18-10M32 28v28M14 38l18-10 18 10" />
      <path d="M24 31h5M35 31h5M28 40c3 2 5 2 8 0" />
      <path stroke={accent} d="M23 18l9-5 9 5M21 48l11 8 11-8" />
    </BrandIconBase>
  );
}

export function ClinCheckIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <rect x="10" y="14" width="44" height="30" rx="3" />
      <path d="M26 50h12M32 44v6" />
      <path d="M20 29c1-5 6-5 7 0 1-5 6-5 7 0 1-5 6-5 7 0" />
      <path d="M19 34c7 3 19 3 26 0" />
      <path stroke={accent} d="M18 38h28" />
    </BrandIconBase>
  );
}

export function TrackingIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M12 28c3-4 8-4 11 0 3-4 8-4 11 0 3-4 8-4 11 0" />
      <path d="M12 34c3 3 8 3 11 0 3 3 8 3 11 0 3 3 8 3 11 0" />
      <path stroke={accent} d="M12 44h40" strokeDasharray="2 6" />
    </BrandIconBase>
  );
}

export function AIDiagnosticsIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <circle cx="32" cy="32" r="7" stroke={accent} />
      <circle cx="16" cy="21" r="3" />
      <circle cx="48" cy="21" r="3" />
      <circle cx="16" cy="43" r="3" />
      <circle cx="48" cy="43" r="3" />
      <path d="M22 24l4 4M42 24l-4 4M22 40l4-4M42 40l-4-4M32 15v10M32 39v10" />
      <circle cx="32" cy="12" r="3" />
      <circle cx="32" cy="52" r="3" />
    </BrandIconBase>
  );
}

export function DigitalWorkflowIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <circle cx="14" cy="22" r="3" />
      <circle cx="30" cy="22" r="3" />
      <circle cx="22" cy="42" r="3" />
      <path d="M17 22h10M30 25v9c0 4-2 8-8 8" />
      <path stroke={accent} d="M39 32h13M47 26l6 6-6 6" />
    </BrandIconBase>
  );
}

export function TreatmentPlanningIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M15 22v-6h6M43 16h6v6M49 42v6h-6M21 48h-6v-6" />
      <path d="M25 29c0-7 14-7 14 0 0 9-3 17-7 17-2 0-2-4-4-4s-2 4-4 4c-4 0-7-8-7-17Z" />
      <path stroke={accent} d="M32 20v8M25 35h14" />
    </BrandIconBase>
  );
}

export function MonitoringIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M13 50h40M13 50V14" />
      <path d="M18 41l8-8 8 5 14-16" />
      <path stroke={accent} d="M44 22h6v6" />
    </BrandIconBase>
  );
}

export function MentorshipIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <circle cx="23" cy="23" r="6" />
      <path d="M12 48c0-8 5-13 11-13s11 5 11 13" />
      <circle cx="43" cy="26" r="5" stroke={accent} />
      <path stroke={accent} d="M36 48c0-7 4-11 9-11s8 4 8 11" />
      <path d="M29 24h8" />
    </BrandIconBase>
  );
}

export function ClinCheckReviewIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <rect x="10" y="14" width="36" height="28" rx="3" />
      <path d="M23 47h10M28 42v5" />
      <path d="M18 27c1-4 5-4 6 0 1-4 5-4 6 0 1-4 5-4 6 0" />
      <path stroke={accent} d="M42 34h10v9l-4-3h-6Z" />
    </BrandIconBase>
  );
}

export function P2PAlignIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M17 21c7-5 12-5 19 0M17 43c7 5 12 5 19 0" />
      <path d="M43 21c-7-5-12-5-19 0M43 43c-7 5-12 5-19 0" />
      <path stroke={accent} d="M24 32h16M34 26l6 6-6 6M30 26l-6 6 6 6" />
    </BrandIconBase>
  );
}

export function PrivateCoursesIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M32 14 12 24l20 10 20-10Z" />
      <path d="M20 29v9c0 4 6 8 12 8s12-4 12-8v-9" />
      <path stroke={accent} d="M52 24v14M52 38l-3 5" />
    </BrandIconBase>
  );
}

export function SASCoursesIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <circle cx="32" cy="15" r="5" />
      <path d="M22 30c0-6 4-10 10-10s10 4 10 10" />
      <circle cx="17" cy="41" r="4" />
      <circle cx="32" cy="43" r="4" />
      <circle cx="47" cy="41" r="4" />
      <path d="M10 54c0-6 3-9 7-9s7 3 7 9M25 56c0-6 3-9 7-9s7 3 7 9M40 54c0-6 3-9 7-9s7 3 7 9" />
      <path stroke={accent} d="M32 24v7" />
    </BrandIconBase>
  );
}

export function SpeakerIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <rect x="24" y="11" width="16" height="30" rx="8" />
      <path d="M17 29c0 9 6 16 15 16s15-7 15-16M32 45v9M24 54h16" />
      <path stroke={accent} d="M40 24h-4M40 30h-4" />
    </BrandIconBase>
  );
}

export function ClinicalDiscussionIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M12 18h16l4 5h20v27H12Z" />
      <path d="M26 33c0-6 12-6 12 0 0 8-3 14-6 14-1.5 0-1.5-4-3-4s-1.5 4-3 4c-3 0-6-6-6-14Z" />
      <path stroke={accent} d="M22 23h26" />
    </BrandIconBase>
  );
}

export function BiomechanicsIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M24 23c0-7 16-7 16 0 0 10-3 19-8 19-2 0-2-5-5-5s-3 5-5 5c-4 0-8-9-8-19Z" />
      <path stroke={accent} d="M17 50v-9M14 44l3-4 3 4M47 50v-9M44 44l3-4 3 4M24 52h16M32 52v-7" />
    </BrandIconBase>
  );
}

export function FacultyIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M15 45h34l4-24-12 10-9-16-9 16-12-10Z" />
      <path d="M18 50h28" />
      <circle cx="32" cy="15" r="2" stroke={accent} />
    </BrandIconBase>
  );
}

export function InternationalSpeakerIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <circle cx="32" cy="32" r="21" />
      <path d="M11 32h42M32 11c7 6 10 13 10 21s-3 15-10 21M32 11c-7 6-10 13-10 21s3 15 10 21" />
      <path d="M16 21c8 4 24 4 32 0M16 43c8-4 24-4 32 0" />
      <path stroke={accent} d="M45 16l4-4M49 16l-4-4" />
    </BrandIconBase>
  );
}

export function CasesIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M18 18h26v28H18Z" />
      <path d="M14 24h26M24 12h26v28" />
      <path stroke={accent} d="M24 31h16M24 38h10" />
    </BrandIconBase>
  );
}

export function ClinicsIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M32 54s15-13 15-27a15 15 0 1 0-30 0c0 14 15 27 15 27Z" />
      <circle cx="32" cy="27" r="5" />
      <path stroke={accent} d="M19 50h-5M45 50h5M32 54v-5" />
    </BrandIconBase>
  );
}

export function DiamondProviderIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M14 22h36L40 48H24Z" />
      <path d="M14 22l8-10h20l8 10M22 12l10 36 10-36M22 22l10-10 10 10" />
      <path stroke={accent} d="M24 48h16" />
    </BrandIconBase>
  );
}

export function EducatorIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M12 18c7-3 14-2 20 3v31c-6-5-13-6-20-3Z" />
      <path d="M52 18c-7-3-14-2-20 3v31c6-5 13-6 20-3Z" />
      <path stroke={accent} d="M20 27h6M20 35h6M38 27h6" />
    </BrandIconBase>
  );
}

export function ResearchIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M30 12h10M35 12v15a12 12 0 1 1-12 12" />
      <path d="M23 39h24M20 52h28M32 27h7" />
      <circle cx="23" cy="39" r="8" />
      <path stroke={accent} d="M43 31l6-6M49 25l3 3" />
    </BrandIconBase>
  );
}

export function InnovationIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M22 30a10 10 0 1 1 20 0c0 6-5 8-6 13h-8c-1-5-6-7-6-13Z" />
      <path d="M28 49h8M29 55h6" />
      <path stroke={accent} d="M32 8V4M18 14l-3-3M46 14l3-3M14 30h-4M50 30h4" />
    </BrandIconBase>
  );
}

export function FirstVisitIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <rect x="14" y="16" width="36" height="34" rx="3" />
      <path d="M14 26h36M22 11v10M42 11v10" />
      <path stroke={accent} d="M27 38l4 4 8-10" />
    </BrandIconBase>
  );
}

export function DiagnosisIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <circle cx="27" cy="27" r="14" />
      <path d="M38 38l13 13" />
      <path stroke={accent} d="M22 27h10M27 22v10" />
    </BrandIconBase>
  );
}

export function PlanningIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <rect x="18" y="14" width="28" height="38" rx="3" />
      <path d="M26 14c0-4 12-4 12 0" />
      <path d="M24 28h16M24 36h16M24 44h9" />
      <path stroke={accent} d="M42 28l4-4" />
    </BrandIconBase>
  );
}

export function TherapyIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M14 34c0-8 36-8 36 0 0 7-6 12-18 12S14 41 14 34Z" />
      <path d="M18 34c2-5 7-5 9 0 2-5 8-5 10 0 2-5 7-5 9 0" />
      <path stroke={accent} d="M20 40c7 3 17 3 24 0" />
    </BrandIconBase>
  );
}

export function FollowUpIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M47 20a19 19 0 0 0-31 12" />
      <path d="M47 20h-10M47 20v-10" />
      <path stroke={accent} d="M17 44a19 19 0 0 0 31-12" />
      <path stroke={accent} d="M17 44h10M17 44v10" />
    </BrandIconBase>
  );
}

export function RefinementIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M14 20h36M14 32h36M14 44h36" />
      <circle cx="26" cy="20" r="4" />
      <circle cx="40" cy="32" r="4" />
      <circle cx="22" cy="44" r="4" />
      <path stroke={accent} d="M30 20h20M14 32h22M26 44h24" />
    </BrandIconBase>
  );
}

export function RetentionIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M16 35c2 10 10 16 16 16s14-6 16-16" />
      <path d="M18 34c4-9 24-9 28 0" />
      <path stroke={accent} d="M22 39c5 5 15 5 20 0" />
    </BrandIconBase>
  );
}

export function MonitoringProcessIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <circle cx="32" cy="32" r="20" />
      <circle cx="32" cy="32" r="11" />
      <circle cx="32" cy="32" r="3" stroke={accent} />
      <path stroke={accent} d="M32 32l12-14" />
    </BrandIconBase>
  );
}

export function GCMonogramIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M36 18c-4-3-10-4-15-1-8 4-10 16-4 24 5 7 16 8 23 2" />
      <path d="M43 26c-3-4-9-5-14-2-6 4-7 13-2 18 5 6 15 5 19-1" />
      <path stroke={accent} d="M36 36h12M48 36v8" />
    </BrandIconBase>
  );
}

export function AlignerIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M13 34c0-9 38-9 38 0 0 8-7 14-19 14S13 42 13 34Z" />
      <path d="M18 34c2-6 7-6 9 0 2-6 8-6 10 0 2-6 7-6 9 0" />
      <path stroke={accent} d="M18 41c7 4 21 4 28 0" />
    </BrandIconBase>
  );
}

export function DigitalToothIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <path d="M22 22c0-8 20-8 20 0 0 13-4 26-10 26-2 0-2-7-5-7s-3 7-5 7c-5 0-10-13-10-26Z" />
      <path stroke={accent} d="M41 17c5 0 7 2 7 7M44 12c7 1 10 4 10 11M39 22h8" />
    </BrandIconBase>
  );
}

export function GeometricPatternIcon(props: BrandIconProps) {
  const dots = [18, 28, 38, 48];
  return (
    <BrandIconBase {...props}>
      {dots.map((x) =>
        dots.map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="currentColor" stroke="none" />
        )),
      )}
      <path stroke={accent} d="M18 18h30v30H18Z" opacity=".55" />
    </BrandIconBase>
  );
}

export function FaviconIcon(props: BrandIconProps) {
  return (
    <BrandIconBase {...props}>
      <circle cx="32" cy="32" r="24" />
      <path d="M35 21c-3-2-8-3-12 0-7 4-7 16 0 20 4 3 10 2 13-1" />
      <path d="M42 27c-3-3-8-3-11 0-5 4-4 12 1 15 4 3 9 2 12-1" />
      <path stroke={accent} d="M36 35h10M46 35v7" />
    </BrandIconBase>
  );
}

export const brandIcons = {
  CrowdingIcon,
  DeepBiteIcon,
  OpenBiteIcon,
  CrossbiteIcon,
  ClassIIIcon,
  ClassIIIIcon,
  ImpactedCanineIcon,
  DiastemaIcon,
  BruxismIcon,
  BiteIcon,
  IntraoralScanIcon,
  VirtualPatientIcon,
  ClinCheckIcon,
  TrackingIcon,
  AIDiagnosticsIcon,
  DigitalWorkflowIcon,
  TreatmentPlanningIcon,
  MonitoringIcon,
  MentorshipIcon,
  ClinCheckReviewIcon,
  P2PAlignIcon,
  PrivateCoursesIcon,
  SASCoursesIcon,
  SpeakerIcon,
  ClinicalDiscussionIcon,
  BiomechanicsIcon,
  FacultyIcon,
  InternationalSpeakerIcon,
  CasesIcon,
  ClinicsIcon,
  DiamondProviderIcon,
  EducatorIcon,
  ResearchIcon,
  InnovationIcon,
  FirstVisitIcon,
  DiagnosisIcon,
  PlanningIcon,
  TherapyIcon,
  FollowUpIcon,
  RefinementIcon,
  RetentionIcon,
  MonitoringProcessIcon,
  GCMonogramIcon,
  AlignerIcon,
  DigitalToothIcon,
  GeometricPatternIcon,
  FaviconIcon,
};

export type BrandIconName = keyof typeof brandIcons;
export type BrandIconComponent = ComponentType<BrandIconProps>;

export function BrandIcon({
  name,
  ...props
}: BrandIconProps & { name: BrandIconName }) {
  const IconComponent = brandIcons[name];
  return <IconComponent {...props} />;
}

export function IconBadge({
  icon: IconComponent,
  dark = false,
  className = "",
}: {
  icon: BrandIconComponent;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border transition-colors ${
        dark
          ? "border-white/10 bg-white/[0.045] text-aqua"
          : "border-teal-deep/10 bg-teal-deep/[0.035] text-teal-deep"
      } ${className}`}
    >
      <IconComponent className="h-10 w-10" />
    </span>
  );
}

export function FeatureIconCard({
  icon,
  title,
  children,
  dark = false,
  compact = false,
  className = "",
}: {
  icon: BrandIconComponent;
  title: string;
  children?: ReactNode;
  dark?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const IconComponent = icon;
  return (
    <article
      className={`group h-full rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
        dark
          ? "border-white/10 bg-white/[0.045] shadow-panel hover:border-aqua/55 hover:bg-white/[0.07]"
          : "border-titanium/55 bg-white/[0.88] shadow-soft hover:border-aqua/60 hover:shadow-glow"
      } ${compact ? "p-5" : "p-6"} ${className}`}
    >
      <div className="flex items-start gap-4">
        <IconBadge icon={IconComponent} dark={dark} className={compact ? "h-14 w-14 [&_svg]:h-9 [&_svg]:w-9" : ""} />
        <div className="min-w-0">
          <h3 className={`font-semibold ${dark ? "text-canvas" : "text-teal-deep"}`}>
            {title}
          </h3>
          {children ? (
            <div
              className={`mt-2 text-sm leading-relaxed ${
                dark ? "text-canvas/[0.68]" : "text-ink/[0.68]"
              }`}
            >
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProofGrid({
  items,
  dark = false,
}: {
  items: {
    value: string;
    label: string;
    icon: BrandIconComponent;
  }[];
  dark?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={`${item.value}-${item.label}`}
          className={`rounded-xl border p-5 ${
            dark
              ? "border-white/10 bg-white/[0.045] text-canvas"
              : "border-titanium/55 bg-white/[0.86] text-ink shadow-soft"
          }`}
        >
          <IconBadge icon={item.icon} dark={dark} />
          <p className={`mt-5 text-2xl font-semibold ${dark ? "text-canvas" : "text-teal-deep"}`}>
            {item.value}
          </p>
          <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-canvas/65" : "text-ink/65"}`}>
            {item.label}
          </p>
        </article>
      ))}
    </div>
  );
}

