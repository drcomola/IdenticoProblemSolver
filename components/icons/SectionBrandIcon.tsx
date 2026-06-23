import type { Audience } from "@/lib/i18n";
import type { SectionKey } from "@/lib/routes";
import {
  AlignerIcon,
  CasesIcon,
  ClinicalDiscussionIcon,
  ClinicsIcon,
  DiamondProviderIcon,
  DiagnosisIcon,
  FacultyIcon,
  FirstVisitIcon,
  InternationalSpeakerIcon,
  IntraoralScanIcon,
  MentorshipIcon,
  P2PAlignIcon,
  PlanningIcon,
  PrivateCoursesIcon,
  SASCoursesIcon,
  TreatmentPlanningIcon,
  type BrandIconComponent,
  type BrandIconProps,
} from "./BrandIcons";

const sectionIconMap: Record<Audience, Partial<Record<SectionKey, BrandIconComponent>>> = {
  patients: {
    about: InternationalSpeakerIcon,   // chi sono → profilo internazionale
    "what-i-offer": TreatmentPlanningIcon,
    "digital-orthodontics": IntraoralScanIcon,
    invisalign: AlignerIcon,
    "invisalign-game": AlignerIcon,
    "patient-expert-program": DiamondProviderIcon,
    "first-consultation": FirstVisitIcon,
    "clinical-cases": CasesIcon,
    clinics: ClinicsIcon,
    faq: ClinicalDiscussionIcon,
    book: PlanningIcon,
  },
  colleagues: {
    about: InternationalSpeakerIcon,
    education: FacultyIcon,
    "private-courses": PrivateCoursesIcon,
    "sas-courses": SASCoursesIcon,
    "align-p2p": P2PAlignIcon,
    "clinical-cases": CasesIcon,
    consulting: MentorshipIcon,
    "patient-expert-program": DiamondProviderIcon,
    "first-consultation": DiagnosisIcon,
    faq: ClinicalDiscussionIcon,
  },
};

export function sectionBrandIcon(
  audience: Audience,
  section: SectionKey,
): BrandIconComponent {
  return sectionIconMap[audience][section] ?? TreatmentPlanningIcon;
}

export function SectionBrandIcon({
  audience,
  section,
  ...props
}: BrandIconProps & {
  audience: Audience;
  section: SectionKey;
}) {
  const Icon = sectionBrandIcon(audience, section);
  return <Icon {...props} />;
}

